const LivenessResult = require('../models/LivenessResult')

/**
 * Initialize getLiveness action
 *
 * @param {object} dependencies dependencies injected
 * @param {object} dependencies.logger logger dependency
 * @returns {Function} getLiveness action
 */
module.exports = ({ logger }) =>
  /**
   * @param {object} params
   * @param {boolean} params.forceFailure Causes failed (for testing)
   */
  async ({ forceFailure } = {}) => {
    logger.trace('getLiveness args', { forceFailure })
    if (forceFailure) throw new Error('Forced failure health check')

    const livenessResult = new LivenessResult({ status: 'OK' })

    logger.trace('getLiveness result', { livenessResult })

    return livenessResult.clone()
  }
