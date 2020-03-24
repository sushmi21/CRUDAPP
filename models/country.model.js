const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const countrySchema = new Schema({
  name: { type: String },
  code: { type: String },
  shortCode: { type: String }
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
