const mongoose = require("mongoose");
const { customerSchema } = require("./customer");
const { movieSchema } = require("./movie");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minLength: 5,
          maxLength: 50,
        },
        isGold: {
          type: Boolean,
          default: false,
        },
        phone: {
          type: String,
          required: true,
          minLength: 5,
          maxLength: 50,
        },
      }),
      required: true,
    },

    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          minLength: 5,
          maxLength: 50,
        },
        dailyRate: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateReturned: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  })
);

function validateRentalrental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  };

  return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.Validate = validateRentalrental;
