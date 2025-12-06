const mongoose = require("mongoose");
const { customerSchema } = require("./customer");
const { movieSchema } = require("./movie");
const Joi = require("joi");

const Rental = mongoose.model(
  "Rental",
  mongoose.Schema({
    customer: {
      type: customerSchema,
      required: true,
    },
    movie: {
      type: movieSchema,
      required: true,
    },
    rentedOn: {
      type: Date,
      default: Date.UTC,
    },
    returnedOn: {
      type: Date,
    },
  })
);

function validateRentalrental(rental) {
  const schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  };

  return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.Validate = validateRentalrental;
