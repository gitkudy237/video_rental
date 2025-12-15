const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
  winston.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, stack }) => {
          return `${timestamp} [${level}]: ${stack || message}`;
        })
      ),
      handleExceptions: true,
      handleRejections: true,
    })
  );

  winston.add(
    new winston.transports.File({
      filename: "logs/uncaught-exceptions.log",
      handleExceptions: true,
      handleRejections: true,
    })
  );

  winston.add(new winston.transports.File({ filename: "logs/app.log" }));
  winston.add(
    new winston.transports.MongoDB({ db: "mongodb://localhost/vidly" })
  );
};
