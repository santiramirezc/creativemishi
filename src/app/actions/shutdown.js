/**
 * Initialize getReadiness action
 *
 * @param {object} dependencies dependencies injected
 * @param {object} dependencies.logger logger dependency
 * @param {object} dependencies.databaseUtil database dependency
 * @returns {Function} shutdown action
 */
module.exports = ({ logger }) => async () => {
  logger.info('running shutdown action')

  return {}
}
