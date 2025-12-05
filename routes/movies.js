const { Movie, Validate } = require("../models/movie");
const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.status(200).send(movies);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);

  return movie
    ? res.status(201).send(movie)
    : res.status(404).send("Movie not found");
});

router.post("/", async (req, res) => {
  const { error } = Validate(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const movie = new Movie(req.body);
  const result = await movie.save();
  res.status(201).send(result);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = Validate(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });

  if (!movie) return res.status(404).send("Movie not found");
  res.status(200).send(movie);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByIdAndDelete(id);
  if (!movie) return res.status(404).send("No Movie with that ID");

  res.send(movie);
});

module.exports = router;
