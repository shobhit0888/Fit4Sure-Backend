const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  before_image: {
    type: String,
    required: true,
  },
  after_image: {
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

module.exports = mongoose.model("Transformations", Schema);
