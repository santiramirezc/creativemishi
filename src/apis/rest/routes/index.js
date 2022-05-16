const router = require('express').Router()


router
  .use('/', require('./probes'))
  .use('/auth', require('./auth'))
  .use('/project', require('./project'))


module.exports = router

