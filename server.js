const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = 5000; //server port number

app.use(cors());
app.use(express.json());

const uri = process.env.URI_ATLAS; //connection string from .env file
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection; // Connect to MongoDB
connection.once("open", () => {
  console.log("Connection to MongoDB established successfully");
});

// Endpoints for airports, countries and airlines collections resp.
const airportsRouter = require("./routes/airports");
app.use("/api/airports", airportsRouter);

const countriesRouter = require("./routes/countries");
app.use("/api/countries", countriesRouter);

const airlinesRouter = require("./routes/airlines");
app.use("/api/airlines", airlinesRouter);

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
