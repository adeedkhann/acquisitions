import winston from 'winston';

const logger = winston.createLogger({
  level:process.env.LOG_LEVEL || 'info',
  format:winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Clean timestamp format
    winston.format.errors({ stack: true }),                     // Captures error stack traces
    winston.format.json()                                       // Outputs as structured JSON
  ),
  defaultMeta: { service: 'acquisitions-api' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
  }));
}

export default logger;