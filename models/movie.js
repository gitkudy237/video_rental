const mongoose = require("mongoose");
const { Genre } = require("./genre");

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

exports.Movie = Movie;
