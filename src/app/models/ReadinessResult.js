
/**
 * @class ReadinessResult
 * @typedef {object} ReadinessResult
 * @property {Array <{ name: string, healthCheck: Function }>} services array of services to check health of
 * @property {Array <{ name: string, status: string, responseTime: string }>} checkedServices array of services with checked health information
 * @property {{ name: string, version: string, environment: string }} app app info
 */
class ReadinessResult {
  /**
   * @param {ReadinessResult} source object from which to instantiate ReadinessResult
   */
  constructor({ services, appName, appVersion, appEnv }) {
    this.app = {
      name: appName,
      status: 'OK',
      version: appVersion,
      environment: appEnv,
    }
    this.services = services
    this.checkedServices = []
  }

  /**
   * Checks all services health and response times
   */
  async checkAllServicesHealth() {
    this.checkedServices = await Promise.all(
      this.services.map(async service => {
        const now = Date.now()
        await service.healthCheck()
        const responseTime = Date.now() - now

        return {
          name: service.name,
          status: 'OK',
          responseTime: `${responseTime}ms`,
        }
      })
    )
  }

  /**
   * @returns {object} readiness result in dto format
   */
  toDto() {
    return {
      app: this.app,
      services: this.checkedServices,
    }
  }
}

module.exports = ReadinessResult
