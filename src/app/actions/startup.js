/**
 * Initialize getReadiness action
 *
 * @param {object} dependencies dependencies injected
 * @param {object} dependencies.logger logger dependency
 * @param {object} dependencies.databaseUtil database dependency
 * @returns {Function} startup action
 */
module.exports = ({ db, aws, logger }) => async () => {
  logger.info('Running startup action')

  db.connect()

  logger.info('Startup action successful.')
  return {}
}
