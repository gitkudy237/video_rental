const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const { Genre, Validate } = require("../models/genre");
const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
  throw new Error("Could not get the genres.");
  const result = await Genre.find().sort({ name: 1 });
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const genre = await Genre.findById({ _id: id });
  return genre
    ? res.status(200).send(genre)
    : res.status(404).send("Genre not found");
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = Validate(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const genre = new Genre({ ...req.body });

  const result = await genre.save();
  res.send(result);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { id } = req.params;
  const { error } = Validate(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const genre = await Genre.findByIdAndUpdate(id, req.body, { new: true });
  if (!genre) return res.status(404).send("No genre with that ID");

  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const { id } = req.params;
  const genre = await Genre.findByIdAndDelete(id);
  if (!genre) return res.status(404).send("No genre with that ID");

  res.send(genre);
});

module.exports = router;
