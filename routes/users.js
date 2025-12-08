const { User, Validate } = require("../models/user");
const { Router } = require("express");

const router = Router();

router.post("/", async (req, res) => {
  const { error } = Validate(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(req.body);
  await user.save();

  res.status(201).send({ name: user.name, email: user.email });
});

module.exports = router;
