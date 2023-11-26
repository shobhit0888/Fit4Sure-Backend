const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
  per_month_price: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  short_description: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Plan", schema);
