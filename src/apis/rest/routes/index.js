const router = require('express').Router()


router
  .use('/', require('./probes'))
  .use('/auth', require('./auth'))
  .use('/project', require('./project'))
  .use('/user', require('./user'))


module.exports = router

