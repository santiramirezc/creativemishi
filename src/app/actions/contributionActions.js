//const fileType = require('file-type');
const fs = require('fs')
const multiparty = require('multiparty')

module.exports = ({ db, aws }) => {


  const getNextVersion = async ({ projectId, part }) => {
    let versions = [0]
    let contributions = await db.Contribution.find({ projectId, part })
    if (contributions.length > 0) {
      for (i = 0; i < contributions.length; i++) {
        if (contributions[i]?.version) {
          versions.push(contributions[i].version)
        }
      }
      return Math.max(...versions) + 1
    } else {
      return 1
    }
  }

  return {
    get: async ({ contributionId }) => {
      try {
        const contribution = await db.Contribution.findById(contributionId)
        if (contribution) {
          return { data: contribution }
        }
        else {
          return { comment: "No contribution with this id" }
        }
      } catch (e) {
        console.log(e)
        return { success: false, status: 500, comment: 'Error on get contribution action ' + e.toString() }
      }
    },

    upload: async ({ req, username }) => {
      const form = new multiparty.Form()
      return new Promise((resolve, reject) => {
        form.parse(req, async (e, fields, files) => {
          if (e) {
            resolve({ ok: false, success: false, status: 500, comment: 'Error on get contribution action ' + e.toString() })
            return
          }

          if (!fields.contributionId) {
            resolve({ ok: true, success: false, status: 200, comment: 'We need the contributionId man...' })
            return
          }
          const { contributionId } = fields

          try {
            //Verify user is owner of contribution
            const contribution = await db.Contribution.findById(contributionId)
            if (!contribution.createdBy === username) {
              resolve({ ok: true, success: false, status: 401, comment: 'Watchout man you are not the owner of this contribution...' })
              return
            }

            //Check if file exist in contribution.files
            const fileName = files.file[0].originalFilename
            if (contribution.files.files.indexOf(fileName) !== -1) {
              resolve({ ok: true, success: false, status: 200, comment: 'This file already exists on your contribution, remove it and try again (if that is what you want)...' })
              return
            }

            //If not save it to aws
            const path = files.file[0].path
            const buffer = fs.readFileSync(path)
            const data = await aws.uploadFile({ buffer, fileName: contributionId + '/' + fileName })
            //Register file in contribution.files
            contribution.files.files.push(fileName)
            contribution.save()
            resolve({ ok: true, success: true, status: 200, data })
            return
          } catch (e) {
            console.log(e)
            resolve({ ok: false, success: false, status: 500, comment: 'Error on get contribution action ' + e.toString() })
            return
          }
        })
      })
    },

    deleteUpload: async ({ contributionId, fileName, username }) => {
      //Verify user is owner of contribution

      try {

        const contribution = await db.Contribution.findById(contributionId)
        if (!contribution.createdBy === username) {
          return { success: false, status: 401, comment: 'Watchout man you are not the owner of this contribution...' }
        }

        //Check if file exist in contribution.files  
        if (contribution.files.files.indexOf(fileName) === -1) {
          return { success: false, status: 400, comment: 'This file does not exists on your contribution' }
        }

        //Check if file is final version
        if (contribution.files.finalVersion === fileName) {
          contribution.files.finalVersion = ''
        }

        //Delete in aws
        await aws.deleteFile({ contributionId, fileName })

        //Register change in contribution.files
        const fileIndex = contribution.files.files.indexOf(fileName)
        contribution.files.files.splice(fileIndex, 1)
        contribution.save()

        return { success: true, status: 200, comment: 'File deleted' }

      } catch (e) {
        return { success: false, status: 500, comment: 'Error on delete upload action: ' + e.toString() }
      }
    },

    setFinalVersion: async ({ contributionId, fileName, username }) => {
      try {

        const contribution = await db.Contribution.findById(contributionId)
        if (!contribution.createdBy === username) {
          return { success: false, status: 401, comment: 'Watchout man you are not the owner of this contribution...' }
        }

        //Check if file exist in contribution.files  
        if (contribution.files.files.indexOf(fileName) === -1) {
          return { success: false, status: 400, comment: 'This file does not exists on your contribution' }
        }

        contribution.files.finalVersion = fileName
        contribution.save()

        return { success: true, status: 200, comment: 'File set sucessfully' }

      } catch (e) {
        return { success: false, status: 500, comment: 'Error on setFinalVersion action: ' + e.toString() }
      }
    },

    updateState: async ({ contributionId, username, state, feedback }) => {
      try {
        const contribution = await db.Contribution.findById(contributionId)
        if (!contribution) {
          return { success: false, state: 400, comment: "This contribution doesn't exist" }
        }

        //Minimun data required
        if (contribution.files.files.length < 1) {
          return { success: false, state: 400, comment: "Please include at least one file" }
        }
        if (!contribution.files.finalVersion) {
          return { success: false, state: 400, comment: "Please mark a final photo or video :)" }
        }

        if (contribution.createdBy === username) {
          //If owner is sending state = waiting for approval
          state = "waiting for approval"
        } else {
          //If an admin of project is sending... state is required
          const { projectId } = contribution
          const project = await db.Project.findOne({ projectId })
          if (!project) {
            return { success: false, state: 400, comment: "This project doesn't exist humm ?" }
          }

          console.log(project)

          let isAdmin = false
          for (let i = 0; i < project.admins.length; i++) {
            let admin = project.admins[i]
            if (admin.username === username) {
              //This user is admin
              isAdmin = true
            }
          }
          if (isAdmin) {
            //User is admin :)
            if (!state) {
              return { success: false, status: 400, comment: "We need the state of the contribution..." }
            }
          } else {
            return { success: false, status: 400, comment: "Hmmm you're not the creator of this contribution or admin of this project (I don't know what you're doing here)" }
          }
        }


        //Set history and state!
        contribution.state = state
        contribution.history.push({ date: Date.now(), feedback, state, username })

        //Add version to contribution if approved
        if (state === 'approved') {
          const { projectId, part } = contribution
          contribution.version = await getNextVersion({ projectId, part })
        }

        //Save contribution
        await contribution.save()

        return { data: contribution }

      } catch (e) {
        console.log(e)
        return { success: false, status: 500, comment: 'Error on updateContribution action: ' + e.toString() }
      }
    },
  }
}