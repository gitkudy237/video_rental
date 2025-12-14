require("dotenv").config();
const winston = require("winston");
require("winston-mongodb");
const error = require("./middleware/error");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

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

const p = Promise.reject(new Error("Something failed miserably"));
p.then(() => console.log("Something should happen"));

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.error("Could not connect to mongoDB: ", err.message));

app.use(express.json());

app.use("/api/genres", genres);
app.use("/api/customer", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
