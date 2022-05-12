require('dotenv').config({ path: '.env' })
const { createContainer, Lifetime, asValue } = require('awilix')
const libraries = require('./libraries')()

/**
 * Initializes container
 *
 * @returns {object} awilix container
 */
module.exports = () => {
  const container = createContainer()

  // Create a registration Object
  const libs = Object.entries(libraries).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: asValue(value),
    }
  }, {})

  container.register(libs)

  container.loadModules([
    './app/actions/*.js',
    './external/*.js',
  ], {
    resolverOptions: {
      lifetime: Lifetime.SINGLETON,
    },
    cwd: __dirname,
    formatName: 'camelCase',
  })

  return container
}
