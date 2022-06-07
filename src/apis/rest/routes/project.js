const router = require('express').Router()
const validate = require('../middleware/validation.middleware')
const projectValidation = require('./validation/project.validation.js')
const contributionValidation = require('./validation/contribution.create.validation')
const { verifyUser } = require('../../../util/auth.utils')

router.get('/', async (req, res) => {
  const projectActions = req.scope.resolve('project')
  const { success = true, status = 200, comment = '', data = {} } = await projectActions.getAllProjects()
  res.statusCode = status
  res.send({ success, status, comment, data })
})

router.get('/:projectId', async (req, res) => {
  const { projectId } = req.params
  const projectActions = req.scope.resolve('project')
  const { project, ok, success, status, comment } = await projectActions.get({ projectId })
  if (!ok) {
    res.statusCode = status
    res.send({ ok, success, status, comment })
  } else {
    res.send({ success, project })
  }
})

router.post('/create', verifyUser, validate(projectValidation), async (req, res) => {
  const project = req.scope.resolve('project')
  const { username } = req.user
  const response = await project.create({ projectData: { ...req.cleanData }, username })
  if (!response.ok) {
    res.statusCode = response.status
    res.send(response)
  } else {
    res.send({ success: true, project: response.project })
  }
})

router.post('/:projectId/contribution', verifyUser, validate(contributionValidation), async (req, res) => {
  const { projectId } = req.params
  const projectActions = req.scope.resolve('project')
  const createdBy = req.user.username
  const { contribution, ok, status, comment } = await projectActions.createContribution({ projectId, createdBy, ...req.cleanData })
  if (!ok) {
    res.statusCode = status
    res.send({ ok, status, comment })
  } else {
    res.send({ success: true, contribution })
  }
})

router.get('/:projectId/contributions', verifyUser, async (req, res) => {
  const { projectId } = req.params
  const projectActions = req.scope.resolve('project')
  const { username } = req.user
  const { success = true, status = 200, comment = '', contributions = {} } = await projectActions.getContributions({ projectId, username })
  res.statusCode = status
  res.send({ success, status, comment, contributions })
})

router.get('/:projectId/part/:partId', async (req, res) => {
  const { projectId, partId } = req.params
  console.log("PARTID = " + partId)
  const projectActions = req.scope.resolve('project')
  const { success = true, status = 200, comment = '', data = {} } = await projectActions.getPart({ projectId, partId })
  res.statusCode = status
  res.send({ success, status, comment, data })
})

module.exports = router