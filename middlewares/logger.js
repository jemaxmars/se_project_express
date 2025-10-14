const winston = require("winston");
const expressWinston = require("express-winston");

// create a request logger
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: winston.format.json(), // Changed to JSON for consistency
    }),
    new winston.transports.File({
      filename: "request.log",
      format: winston.format.json(),
    }),
  ],
});

// error logger
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: "error.log",
    }),
  ],
  format: winston.format.json(),
});

// Export the loggers
module.exports = {
  requestLogger,
  errorLogger,
};
