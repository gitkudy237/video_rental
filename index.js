require("dotenv").config();
const express = require("express");
const Joi = require("joi");

const app = express();
app.use(express.json());

const genres = [
  { id: 1, name: "Genre1" },
  { id: 2, name: "Genre2" },
  { id: 3, name: "Genre3" },
];

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const { id } = req.params;
  const genre = genres.find((g) => g.id === parseInt(id));

  return genre
    ? res.send(genre)
    : res.status(404).send("No genre with that ID");
});

app.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);
  res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  const { id } = req.params;
  const genre = genres.find((g) => g.id === parseInt(id));
  if (!genre) return res.status(400).send("No genre with that ID");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  genre.name = req.body.name;
  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
