const mongoose = require("mongoose");
const { Router } = require("express");

const router = Router();

const Customer = mongoose.model(
  "Customer",
  mongoose.Schema({
    name: String,
    phone: String,
    isGold: Boolean,
  })
);

module.exports = router;
