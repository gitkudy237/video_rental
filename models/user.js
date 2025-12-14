const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 55,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 10,
    maxLength: 55,
  },
  password: {
    // TODO: Install joi-password-complexity to enforce password validation
    type: String,
    required: true,
    minLength: 8,
    maxLength: 1024,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(55).required(),
    email: Joi.string().min(5).max(55).required().email(),
    password: Joi.string().min(8).max(255).required(),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.Validate = validateUser;
