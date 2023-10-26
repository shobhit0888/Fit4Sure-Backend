const mongoose = require("mongoose");

const Trackhealth = new mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  activity_level: {
    type: String,
    required: false,
  },
  goal: {
    type: String,
    required: false,
  },
  approach: {
    type: String,
    required: false,
  },
  waist: {
    type: Number,
    required: true,
  },
  hip: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Trackhealth", Trackhealth);
