const { createLogger, format, transports } = require('winston')

module.exports = ({ envConfig }) => {
  const localLogger = createLogger({
    level: envConfig.LOG_LEVEL,
    format: format.combine(
      format.timestamp(),
      format.colorize(),
      format.simple(),
      format.printf(({ level, message, timestamp }) => `${timestamp} ${level.padStart(15, ' ')}: ${message}`)
    ),
    transports: [new transports.Console()],
  })

  localLogger.trace = localLogger.debug

  return localLogger

}
