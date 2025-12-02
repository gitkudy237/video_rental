const Joi = require("joi");
const mongoose = require("mongoose");
const { Router } = require("express");

const router = Router();

const Customer = mongoose.model(
  "Customer",
  mongoose.Schema({
    name: String,
    phone: String,
    isGold: Boolean,
  })
);

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort({ name: 1 });
  return res.status(200).send(customers);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findById({ _id: id });
    return customer
      ? res.status(200).send(customer)
      : res.status(404).send("Genre not found");
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const customer = new Customer(req.body);
  try {
    const result = await customer.save();
    res.status(201).send(result);
  } catch (error) {
    console.error(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const customer = await Customer.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!customer) return res.status(404).send("No Customer with that ID");

  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const customer = await Customer.findByIdAndDelete(id);
  if (!customer) return res.status(404).send("No customer with that ID");

  res.send(customer);
});

function validateCustomer(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
    phone: Joi.string().min(5).required(),
    isGold: Joi.boolean().required(),
  };

  return Joi.validate(genre, schema);
}

module.exports = router;
