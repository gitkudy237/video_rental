require("dotenv").config();
const winston = require("winston");
require("winston-mongodb");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("./startup/routes")(app);

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

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.error("Could not connect to mongoDB: ", err.message));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
