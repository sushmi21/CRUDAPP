const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const airportSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  location: {
    type: String,
    required: true
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: "Country"
  }, //single country id
  airlines: [{ type: Schema.Types.ObjectId, ref: "Airline" }] // list of airline ids
});

const Airport = mongoose.model("Airport", airportSchema);

module.exports = Airport;
