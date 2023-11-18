const mongoose = require("mongoose");

const Trackhealth = new mongoose.Schema({
  BMI: {
    Type: Number,
  },
  BMR: {
    Type: Number,
  },
  BFP: {
    Type: Number,
  },
  IBW: {
    Type: Number,
  },
  TDEE: {
    Type: Number,
  },
  WHR: {
    Type: Number,
  },
  ABSI: {
    Type: Number,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Trackhealth;
