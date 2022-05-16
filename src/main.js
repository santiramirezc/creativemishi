require('dotenv').config({ path: '.env' })
const { createContainer, Lifetime } = require('awilix')

let container
/**
 * Initializes container
 *
 * @returns {object} awilix container
 */
module.exports = () => {
  if (!container) {
    container = createContainer()
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
  }

  return container
}
