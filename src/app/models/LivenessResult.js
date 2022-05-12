
/**
 * @class LivenessResult
 * @typedef {object} LivenessResult
 * @property {string} status status of liveness check
 */
class LivenessResult {
  /**
   * @param {LivenessResult} source object from which to instantiate LivenessResult
   */
  constructor({ status }) {
    this.status = status
  }

  /**
   * @returns {LivenessResult} model clone
   */
  clone() {
    return new LivenessResult(JSON.parse(JSON.stringify(this)))
  }
}

module.exports = LivenessResult
