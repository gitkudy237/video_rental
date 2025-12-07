const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const mongoose = require("mongoose");
const { Rental, Validate } = require("../models/rental");
const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.status(200).send(rentals);
});

router.post("/", async (req, res) => {
  const { error } = Validate(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const { customerId, movieId } = req.body;

  const customer = await Customer.findById(customerId);
  if (!customer) return res.status(400).send("Invalid customer");
  console.log(customer);

  const movie = await Movie.findById(movieId);
  if (!movie) return res.status(400).send("Invalid movie");
  console.log(movie);

  if (movie.mumberInStock === 0)
    return res.status(400).send("Movie not in stock");
  console.log(movie.mumberInStock);

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRate: movie.dailyRate,
    },
  });

  try {
    await rental.save();
    await Movie.updateOne({ _id: movie._id }, { $inc: { mumberInStock: -1 } });

    res.status(201).send(rental);
  } catch (error) {
    res.status(500).send(`Something failed: ${error}`);
  }
});

module.exports = router;
