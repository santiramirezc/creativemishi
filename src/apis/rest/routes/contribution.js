const router = require('express').Router()
const { verifyUser } = require('../../../util/auth.utils')
const validate = require('../middleware/validation.middleware')
const deleteValidation = require('./validation/upload.delete.validation')
const contributeValidation = require('./validation/contribute.update.validation')

router.get('/:contributionId', async (req, res) => {
  const { contributionId } = req.params
  const contributionActions = req.scope.resolve('contributionActions')
  const { success = true, status = 200, comment = "", data = null } = await contributionActions.get({ contributionId })
  res.statusCode = status
  res.send({ success, status, comment, data })
})

router.post('/:contributionId/upload', verifyUser, async (req, res) => {
  //TODO: Verify user and include credentials in reactapp
  const contributionActions = req.scope.resolve('contributionActions')
  const { contributionId } = req.params
  //const { fileName } = req.cleanData
  const { username } = req.user
  const { success = true, status = 500, comment = '', data = {} } = await contributionActions.upload({ req, contributionId, username })
  res.statusCode = status
  res.send({ success, status, comment, data })
});

router.delete('/:contributionId/upload', verifyUser, validate(deleteValidation), async (req, res) => {
  //Verify user
  const contributionActions = req.scope.resolve('contributionActions')
  const { contributionId } = req.params
  const { fileName } = req.cleanData
  const { username } = req.user
  const { success = true, status = 500, comment = '', data = {} } = await contributionActions.deleteUpload({ contributionId, fileName, username })
  res.statusCode = status
  res.send({ success, status, comment, data })
});

router.post('/:contributionId/final', verifyUser, validate(deleteValidation), async (req, res) => {
  //Verify user
  const contributionActions = req.scope.resolve('contributionActions')
  const { contributionId } = req.params
  const { fileName } = req.cleanData
  const { username } = req.user
  const { success = true, status = 500, comment = '', data = {} } = await contributionActions.setFinalVersion({ contributionId, fileName, username })
  res.statusCode = status
  res.send({ success, status, comment, data })
});

router.put('/:contributionId', verifyUser, validate(contributeValidation), async (req, res) => {
  const contributionActions = req.scope.resolve('contributionActions')
  const { contributionId } = req.params
  const { username } = req.user
  const { state, feedback } = req.cleanData
  const { success = true, status = 200, comment = '', data = null } = await contributionActions.updateState({ contributionId, username, state, feedback })
  res.statusCode = status
  res.send({ success, status, comment, data })
})
module.exports = router