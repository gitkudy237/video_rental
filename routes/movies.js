const { Movie } = require("../models/movie");
const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.status(200).send(movies);
});

module.exports = router;
