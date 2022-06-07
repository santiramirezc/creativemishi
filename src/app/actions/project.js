const e = require("express")

module.exports = ({ db }) => {

  return {
    get: async ({ projectId }) => {
      console.log(projectId)
      try {
        const projectExist = await db.Project.findOne({ projectId })
        if (!projectExist) {
          return { ok: true, success: false, status: 400, comment: "This project doesn't exists" }
        }
        const { _doc } = await db.Project.findOne({ projectId })
        const parts = await db.Contribution.find({ projectId, state: 'approved' })
        //Filter unique and lasts versions of parts
        const uniqueParts = parts.map(p => { return { part: p.part, version: p.version, id: p._id } }).filter((p, i, s) => s.indexOf(p) === i)

        let lastContributions = []
        for (let i = 0; i < parts.length; i++) {
          let contribution = parts[i]
          let { version, part } = contribution
          //Si tiene version y no existe en el array lo añadimos
          if (version) {
            if (!lastContributions[part - 1]) {
              lastContributions[part - 1] = contribution
            } else {
              //Si existe verificamos si esta version es mayor y la remplazamos
              if (version > lastContributions[part - 1].version) {
                lastContributions[part - 1] = contribution
              }
            }
          }
        }
        console.log(uniqueParts)
        return { ok: true, success: true, status: 200, project: { ..._doc, parts: lastContributions } }
      }
      catch (e) {
        return { ok: false, success: false, status: 500, comment: 'Error on get project action: ' + e.toString() }
      }
    },

    getAllProjects: async () => {
      try {
        const projects = await db.Project.find()
        return { data: projects }
      } catch (e) {
        return { success: false, comment: `Error on getAllProject action: ${e.toString()}` }
      }
    },

    getContributions: async ({ projectId, username }) => {
      try {
        const project = await db.Project.findOne({ projectId })
        if (!project) {
          return { success: false, status: 400, comment: "This project doesn't already exists" }
        }
        let isAdmin = false
        for (let i = 0; i < project.admins.length; i++) {
          let admin = project.admins[i]
          if (admin.username === username) {
            //This user is admin
            isAdmin = true
          }
        }
        if (!isAdmin) {
          return { success: false, status: 401, comment: "You're not admin of this project" }
        }
        const contributions = await db.Contribution.find({ projectId, $or: [{ state: 'waiting for approval' }, { state: 'changes requested' }] })
        if (contributions.length > 0) {
          return { contributions }
        }
        return { comment: "This project doesn't have any contributions yet" }
      } catch (e) {
        return { success: false, status: 500, comment: "Error on getContributions: " + e.toString() }
      }
    },

    create: async ({ projectData, username }) => {
      try {
        const projectExist = await db.Project.findOne({ projectId: projectData.projectId })
        if (projectExist) {
          return { ok: true, success: false, status: 200, comment: "This project id already exists" }
        }
        const project = new db.Project(projectData)
        project.createdBy = username
        project.admins.push({ username, role: "admin" })
        const newProject = await project.save()
        return { ok: true, success: true, status: 200, project: newProject, comment: "Project created sucessfully" }
      }
      catch (e) {
        return { ok: false, success: false, status: 500, comment: 'Error on create project action: ' + e.toString() }
      }
    },

    createContribution: async (contributionData) => {
      try {
        const { projectId, part } = contributionData

        const projectExist = await db.Project.findOne({ projectId })
        if (!projectExist) {
          return { ok: false, success: true, status: 200, comment: "This project doesn't exists" }
        }
        //Find last version of part
        const contribution = new db.Contribution(contributionData)
        contribution.save()
        return { ok: true, success: true, contribution }
      }
      catch (e) {
        return { ok: false, success: false, status: 500, comment: 'Error on create contribution action: ' + e.toString() }
      }
    },

    getPart: async ({ projectId, partId }) => {
      try {
        const projectExist = await db.Project.findOne({ projectId })
        if (!projectExist) {
          return { success: false, status: 400, comment: "This project doesn't exists" }
        }
        const parts = await db.Contribution.find({ projectId, state: 'approved', part: partId })

        return { data: parts }
      }
      catch (e) {
        return { success: false, status: 500, comment: 'Error on get part action: ' + e.toString() }
      }
    }
  }
}

