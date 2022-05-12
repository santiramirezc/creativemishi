/**
 * This function returns a dependency object with all dependency functions mocked.
 * Useful for testing.
 *
 * @param {object} overrides - override values
 * @returns {object} - fully mocked dependency object
 */
module.exports = (overrides) => {
  return {
    apm: {
      connect: jest.fn(),
    },
    envConfig: {
      SERVICE_ID: 'test-app',
      SERVICE_VERSION: '0.0.0',
      ENV: 'test',
    },
    logger: {
      debug: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      trace: jest.fn(),
      warn: jest.fn(),
    },
    databaseUtil: {
      close: jest.fn(),
      migrate: jest.fn(),
      ping: jest.fn(),
    },

    // Libraries
    APMLib: {
      start: jest.fn(),

    },
    LoggerLib: {
      Logger: jest.fn(),
    },
    ...overrides,
  }
}
