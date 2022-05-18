const router = require('express').Router()

router.get('/:contributionId', async (req, res) => {
  const { contributionId } = req.params
  const contributionActions = req.scope.resolve('contributionActions')
  const { ok, success, status, comment, contribution } = await contributionActions.get({ contributionId })
  if (!ok) {
    res.statusCode = status
    res.send({ ok, success, status, comment })
  } else {
    res.send({ success, contribution })
  }
})

module.exports = router