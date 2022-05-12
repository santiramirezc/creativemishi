const ReadinessResult = require('../models/ReadinessResult')

/**
 * Initialize getReadiness action
 *
 * @param {object} dependencies dependencies injected
 * @param {object} dependencies.logger logger dependency
 * @param {object} dependencies.databaseUtil database dependency
 * @param {object} dependencies.envConfig config dependency
 * @returns {Function} getLiveness action
 */
module.exports = ({ databaseUtil, logger, envConfig }) =>
  /**
   * @param {object} params
   * @param {boolean} params.forceFailure Causes failed (for testing)
   */
  async ({ forceFailure } = {}) => {
    logger.trace('getReadiness args', { forceFailure })

    if (forceFailure) throw new Error('Forced failure health check')

    const readinessResult = new ReadinessResult({
      appName: envConfig.SERVICE_ID,
      appVersion: envConfig.SERVICE_VERSION,
      appEnv: envConfig.ENV,
      services: [
        { name: 'db', healthCheck: databaseUtil.ping },
      ],
    })

    await readinessResult.checkAllServicesHealth()

    logger.trace('getReadiness results', { readinessResult })

    return readinessResult.toDto()
  }
