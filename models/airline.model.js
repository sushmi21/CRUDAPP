const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const airlineSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  country: { type: Schema.Types.ObjectId, ref: "Country" } //single country id
});

const Airline = mongoose.model("Airline", airlineSchema);

module.exports = Airline;
