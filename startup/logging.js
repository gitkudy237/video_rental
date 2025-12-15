const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
  winston.add(
    new winston.transports.File({
      filename: "uncaught-exceptions.log",
      handleExceptions: true,
      handleRejections: true,
    })
  );

  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(
    new winston.transports.MongoDB({ db: "mongodb://localhost/vidly" })
  );
};
