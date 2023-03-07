const router = require('express').Router()


router
  .use('/api/auth', require('./auth'))
  .use('/api/project', require('./project'))
  .use('/api/user', require('./user'))
  .use('/api/contribution', require('./contribution'))
  .use('*', require('../react-route'))


module.exports = router

