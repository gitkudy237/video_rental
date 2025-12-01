const Joi = require("joi");
const express = require("express");
const router = express.Router();
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

router.get("/", async (req, res) => {
  const result = await Genre.find().sort({ name: 1 });
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const genre = await Genre.findById({ _id: id });
    return genre
      ? res.status(200).send(genre)
      : res.status(404).send("Genre not found");
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const genre = new Genre({ ...req.body });

  try {
    const result = await genre.save();
    res.send(result);
  } catch (error) {
    console.log("Error: ", error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const genre = await Genre.findByIdAndUpdate(id, req.body, { new: true });
  if (!genre) return res.status(404).send("No genre with that ID");

  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const genre = await Genre.findByIdAndDelete(id);
  if (!genre) return res.status(404).send("No genre with that ID");

  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

module.exports = router;
