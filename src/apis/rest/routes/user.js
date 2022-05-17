const router = require('express').Router()
const { verifyUser } = require('../../../util/auth.utils')

router.get('/', verifyUser, async (req, res) => {
  const userActions = req.scope.resolve('userActions')
  const response = await userActions.get({ username: req.user.username })
  res.send(response)
})


module.exports = router