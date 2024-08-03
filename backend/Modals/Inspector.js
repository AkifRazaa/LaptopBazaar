const mongoose = require("mongoose");

const inspectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "inspector",
  },
  region: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

const Inspector = mongoose.model("Inspector", inspectorSchema);

module.exports = Inspector;
