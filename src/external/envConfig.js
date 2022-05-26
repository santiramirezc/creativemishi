const {
  name: serviceId,
  version: serviceVersion,
} = require('../../package.json')

/**
 * EnvConfig Module
 *
 * This is to be used to "register" environment variables
 * used within this service. This makes is easier for testing
 * and to have a single place for the documentation of all
 * environment variables used within this service.
 *
 * @returns {object} envConfig
 */
module.exports = () => ({
  ENV: process.env.ENV,
  LOG_LEVEL: process.env.LOG_LEVEL,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  SERVICE_ID: serviceId,
  SERVICE_VERSION: serviceVersion,

  MONGO_URI: process.env.MONGO_URI,

  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  S3_BUCKET: process.env.S3_BUCKET,
})
