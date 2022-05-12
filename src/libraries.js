/**
 * Returns a map of library dependencies.
 *
 * @returns {object} map of library names and their DI names
 * Keys are the names they will be registered as with the DI container.
 * Values are the npm library.
 * Note: This should be used to inject libraries into the application modules
 * over importing them directly in modules. This will allow the DI container to
 * manage the lifecycle of the library, along with making it easier to
 * unit test modules that use libraries.
 */

module.exports = () => ({
})
