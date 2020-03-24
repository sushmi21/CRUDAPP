const router = require("express").Router();
let Airport = require("../models/airport.model");

// Get all airports
router.route("/").get((req, res) => {
  Airport.find()
    .then(airports => res.json(airports))
    .catch(error => res.status(400).json("Error:" + error));
});

// Get airport info for given id
router.route("/:id").get((req, res) => {
  Airport.findById(req.params.id)
    .then(airport => res.json(airport))
    .catch(error => res.status(400).json("Error:" + error));
});

// Delete specific airport
router.route("/:id").delete((req, res) => {
  Airport.findByIdAndDelete(req.params.id)
    .then(airport => res.json(airport))
    .catch(error => res.status(400).json("Error:" + error));
});

// Create new airpost
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const location = req.body.location;
  const country = req.body.country;
  const airlines = req.body.airlines;
  const newAirport = new Airport({ name, location, country, airlines });

  newAirport
    .save()
    .then(() => res.json("New Airport added successfully!"))
    .catch(error => res.status(400).json("Error:" + error));
});

// Update specific airport
router.route("/update/:id").put((req, res) => {
  Airport.findById(req.params.id).then(airport => {
    airport.name = req.body.name;
    airport.location = req.body.location;
    airport.country = req.body.country;
    airport.airlines = req.body.airlines;

    airport
      .save()
      .then(() => res.json("Airport updated successfully!"))
      .catch(error => res.status(400).json("Error:" + error));
  });
});

module.exports = router;
