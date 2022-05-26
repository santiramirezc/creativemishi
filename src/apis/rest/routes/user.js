const router = require('express').Router()
const { verifyUser } = require('../../../util/auth.utils')

router.get('/', verifyUser, async (req, res) => {
  const userActions = req.scope.resolve('userActions')
  const response = await userActions.get({ username: req.user.username })
  res.send(response)
})

router.get('/contributions', verifyUser, async (req, res) => {
  const userActions = req.scope.resolve('userActions')
  const { username } = req.user
  const { success = false, status = 500, contributions = {}, comment = '' } = await userActions.getContributions({ username })
  res.statusCode = status
  res.send({ success, contributions, comment })
})


module.exports = router