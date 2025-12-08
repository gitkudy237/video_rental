const { User, Validate } = require("../models/user");
const { Router } = require("express");
const _ = require("lodash");

const router = Router();

router.post("/", async (req, res) => {
  const { error } = Validate(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  await user.save();

  const result = _.pick(user, ["_id", "name", "email"]);

  res.status(201).send(result);
});

module.exports = router;
