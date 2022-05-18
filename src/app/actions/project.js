const e = require("express")

module.exports = ({ db }) => {

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
    get: async ({ projectId }) => {
      console.log(projectId)
      try {
        const projectExist = await db.Project.findOne({ projectId })
        if (!projectExist) {
          return { ok: true, success: true, status: 200, comment: "This project doesn't exists" }
        }
        const { _doc } = await db.Project.findOne({ projectId })
        const parts = await db.Contribution.find({ projectId })
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

    create: async (project) => {
      try {
        const projectExist = await db.Project.findOne({ projectId: project.projectId })
        if (projectExist) {
          return { ok: true, success: false, status: 200, comment: "This project id already exists" }
        }
        const projectDb = new db.Project(project)
        const newProject = await projectDb.save()
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
        //const version = await getNextVersion({ projectId, part })
        const contribution = new db.Contribution(contributionData)
        //contribution.version = version
        contribution.save()
        return { ok: true, success: true, contribution }
      }
      catch (e) {
        return { ok: false, success: false, status: 500, comment: 'Error on create contribution action: ' + e.toString() }
      }
    }
  }
}

