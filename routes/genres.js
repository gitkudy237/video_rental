const Joi = require("joi");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/movies")
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.error("Could not connect to mongoDB: ", err.message));

const genres = [
  { id: 1, name: "Genre1" },
  { id: 2, name: "Genre2" },
  { id: 3, name: "Genre3" },
];

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const genre = genres.find((g) => g.id === parseInt(id));

  return genre
    ? res.send(genre)
    : res.status(404).send("No genre with that ID");
});

router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);
  res.send(genre);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const genre = genres.find((g) => g.id === parseInt(id));
  if (!genre) return res.status(400).send("No genre with that ID");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  genre.name = req.body.name;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const genre = genres.find((g) => g.id === parseInt(id));
  if (!genre) return res.status(400).send("No genre with that ID");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

module.exports = router;
