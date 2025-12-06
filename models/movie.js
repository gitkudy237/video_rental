const mongoose = require("mongoose");
const { genreSchema } = require("./genre");
const Joi = require("joi");

const movieSchema = mongoose.Schema({
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
    min: 0,
    max: 255,
  },
  dailyRate: {
    type: Number,
    min: 0,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

function validateCustomer(movie) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().integer().min(0).required(),
    dailyRate: Joi.number().integer().min(0).required(),
  };

  return Joi.validate(movie, schema);
}

exports.movieSchema = movieSchema;
exports.Movie = Movie;
exports.Validate = validateCustomer;
