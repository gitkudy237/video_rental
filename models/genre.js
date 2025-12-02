const Joi = require("joi");
const mongoose = require("mongoose");

const Genre = mongoose.model(
  "Genre",
  mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      trim: true,
    },
  })
);

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.Validate = validateGenre;
