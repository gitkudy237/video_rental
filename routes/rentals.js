const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const { Rental } = require("../models/rental");
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

  const movie = await Movie.findById(movieId);
  if (!movie) return res.status(400).send("Invalid movie");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock");

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._d,
      title: movie.title,
      dailyRate: movie.dailyRate,
    },
  });
  const result = await rental.save();

  movie.numberInStock--;
  movie.save();

  res.status(201).send(result);
});

module.exports = router;
