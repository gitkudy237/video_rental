const bcrypt = require("bcrypt");
const _ = require("lodash");
const Joi = require("joi");
const { User } = require("../models/user");
const { Router } = require("express");

const router = Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(request) {
  const schema = {
    email: Joi.string().min(5).max(55).required().email(),
    password: Joi.string().min(8).max(255).required(),
  };

  return Joi.validate(request, schema);
}

module.exports = router;
