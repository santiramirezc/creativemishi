const router = require('express').Router()
const validate = require('../middleware/validation.middleware')
const projectValidation = require('./validation/project.validation.js')
const { verifyUser, COOKIE_OPTIONS } = require('../../../util/auth.utils')

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

module.exports = router