const { Movie, Validate } = require("../models/movie");
const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.status(200).send(movies);
});

router.post("/", async (req, res) => {
  const { error } = Validate(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const movie = new Movie(req.body);
  const result = await movie.save();
  res.status(201).send(result);
});

module.exports = router;
