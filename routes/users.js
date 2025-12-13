const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, Validate } = require("../models/user");
const { Router } = require("express");

const router = Router();

router.post("/", async (req, res) => {
  const { error } = Validate(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const email = req.body.email;
  console.log(email);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  const result = _.pick(user, ["_id", "name", "email"]);

  res.header("x-auth-token", token).status(201).send(result);
});

module.exports = router;
