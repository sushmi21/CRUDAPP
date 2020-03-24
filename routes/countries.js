const router = require("express").Router();
let Country = require("../models/country.model");

// Get list of all countries
router.route("/").get((req, res) => {
  Country.find()
    .then(countries => res.json(countries))
    .catch(error => res.status(400).json("Error:" + error));
});

// Get specific country
router.route("/:id").get((req, res) => {
  Country.findById(req.params.id)
    .then(country => res.json(country))
    .catch(error => res.status(400).json("Error:" + error));
});

// Add a country
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const code = req.body.code;
  const shortCode = req.body.shortCode;
  const newCountry = new Country({ name, code, shortCode });
  newCountry
    .save()
    .then(() => res.json("New Country added successfully!"))
    .catch(error => res.status(400).json("Error:" + error));
});

module.exports = router;
