const Joi = require("joi");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/movies")
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.error("Could not connect to mongoDB: ", err.message));

const genreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 55,
    trim: true,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

// const genres = [
//   { id: 1, name: "Genre1" },
//   { id: 2, name: "Genre2" },
//   { id: 3, name: "Genre3" },
// ];

router.get("/", async (req, res) => {
  const result = await Genre.find().sort({ name: 1 });
  res.send(result);
});

// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   const genre = genres.find((g) => g.id === parseInt(id));

//   return genre
//     ? res.send(genre)
//     : res.status(404).send("No genre with that ID");
// });

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

// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const genre = genres.find((g) => g.id === parseInt(id));
//   if (!genre) return res.status(400).send("No genre with that ID");

//   const { error } = validateGenre(req.body);
//   if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

//   genre.name = req.body.name;
//   res.send(genre);
// });

// router.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   const genre = genres.find((g) => g.id === parseInt(id));
//   if (!genre) return res.status(400).send("No genre with that ID");

//   const index = genres.indexOf(genre);
//   genres.splice(index, 1);

//   res.send(genre);
// });

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

module.exports = router;
