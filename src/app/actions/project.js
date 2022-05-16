const e = require("express")

module.exports = ({ db }) => ({

  create: async (project) => {
    try {
      const projectDb = new db.Project(project)
      const newProject = await projectDb.save()
      return { ok: true, status: 200, project: newProject, comment: "Project created sucessfully" }
    }
    catch (e) {
      return { ok: false, status: 500, comment: 'Error on create project action: ' + e.toString() }
    }
  },

})