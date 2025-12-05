const mongoose = require("mongoose");
const { Genre } = require("./genre");
const Joi = require("joi");

const genreSchema = Genre.schema;

const Movie = mongoose.model(
  "Movie",
  mongoose.Schema({
    title: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    mumberInStock: {
      type: Number,
      default: 0,
    },
    dailyRate: {
      type: Number,
      default: 0,
    },
  })
);

function validateCustomer(genre) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genre: Joi.object({
      name: Joi.string().min(5).max(50).required(),
    }),
    numberInStock: Joi.number().integer(),
    dailyRate: Joi.number().integer(),
  };

  return Joi.validate(genre, schema);
}

exports.Movie = Movie;
exports.Validate = validateCustomer;
