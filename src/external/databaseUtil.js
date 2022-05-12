/**
 * Initializes database utility
 *
 * @param {object} dependencies  dependencies injected
 * @param {object} dependencies.logger logger
 * @returns {object} databaseUtil
 */
module.exports = ({ logger }) => ({
  /**
   * Pings database
   */
  ping: () => {
    logger.info('pinging database')
  },
  /**
   * performs database migration
   */
  migrate: () => {
    logger.info('running database migration')
  },
  /**
   * closes database connections
   */
  close: () => {
    logger.info('closing database connections')
  },
})
