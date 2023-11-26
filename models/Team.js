const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
    required: true,
  },
  twitter: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    required: true,
  },
  experties: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date().toLocaleDateString(),
  },
  updated_at: {
    type: Date,
    default: new Date().toLocaleDateString(),
  },
});

module.exports = mongoose.model("Team", TeamSchema);
