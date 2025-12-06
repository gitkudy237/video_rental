const { Rental } = require("../models/rental");
const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("rentedOn");
  res.status(200).send(rentals);
});

module.exports = router;
