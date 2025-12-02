require("dotenv").config();
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.error("Could not connect to mongoDB: ", err.message));

const app = express();
app.use(express.json());

app.use("/api/genres", genres);
app.use("/api/customer", customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
