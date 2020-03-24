const router = require("express").Router();
let Airline = require("../models/airline.model");

// Get list of all airlines
router.route("/").get((req, res) => {
  Airline.find()
    .then(airlines => res.json(airlines))
    .catch(error => res.status(400).json("Error:" + error));
});

// Get airline info for given Id
router.route("/:id").get((req, res) => {
  Airline.findById(req.params.id)
    .then(airline => res.json(airline))
    .catch(error => res.status(400).json("Error:" + error));
});

// Delete a specific airline
router.route("/:id").delete((req, res) => {
  Airline.findByIdAndDelete(req.params.id)
    .then(airline => res.json(airline))
    .catch(error => res.status(400).json("Error:" + error));
});

// Create a new airline
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const country = req.body.country;
  const newAirline = new Airline({ name, country });

  newAirline
    .save()
    .then(() => res.json("New Airline added successfully!"))
    .catch(error => res.status(400).json("Error:" + error));
});

// Update a specific airline
router.route("/update/:id").put((req, res) => {
  Airline.findById(req.params.id).then(airline => {
    airline.name = req.body.name;
    airline.country = req.body.country;

    airline
      .save()
      .then(() => res.json("Airline updated successfully!"))
      .catch(error => res.status(400).json("Error:" + error));
  });
});

module.exports = router;
