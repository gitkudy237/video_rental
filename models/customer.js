const Joi = require("joi");
const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
    },
    phone: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 15,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
  })
);

function validateCustomer(genre) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
  };

  return Joi.validate(genre, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
