/**
 * Initialize getReadiness action
 *
 * @param {object} dependencies dependencies injected
 * @param {object} dependencies.logger logger dependency
 * @param {object} dependencies.databaseUtil database dependency
 * @returns {Function} startup action
 */
module.exports = ({ databaseUtil, logger }) => async () => {
  logger.info('Running startup action')

  await databaseUtil.migrate()

  logger.info('Startup action successful.')
  return {}
}
