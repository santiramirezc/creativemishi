const router = require('express').Router()
const validate = require('../middleware/validation.middleware')
const projectValidation = require('./validation/project.validation.js')
const contributionValidation = require('./validation/contribution.create.validation')
const { verifyUser } = require('../../../util/auth.utils')

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
  const createdBy = req.user.username
  const response = await project.create({ ...req.cleanData, createdBy })
  if (!response.ok) {
    res.statusCode = response.status
    res.send(response)
  } else {
    res.send({ success: true, project: response.project })
  }
})

router.post('/:projectId/contribution', validate(contributionValidation), async (req, res) => {
  const { projectId } = req.params
  const projectActions = req.scope.resolve('project')
  const createdBy = 'sramirez'
  const { contribution, ok, status, comment } = await projectActions.createContribution({ projectId, createdBy, ...req.cleanData })
  if (!ok) {
    res.statusCode = status
    res.send({ ok, status, comment })
  } else {
    res.send({ success: true, contribution })
  }

})

module.exports = router