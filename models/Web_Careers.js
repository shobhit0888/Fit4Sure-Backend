const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  qualification: {
    type: String,
    require: true,
  },
  experience: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  created_at: {
    type: String,
    default: Date.now,
  },
  updated_at: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("Careers", schema);
