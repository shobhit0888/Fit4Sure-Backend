const mongoose = require("mongoose");
const trackhealth = require("./trackhealth");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  Trainers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer", // "User" should be replaced with the actual model name for users
    },
  ],
  image: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  stateOfResidence: {
    type: String,
  },
  test: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  optedplan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
  },
  record: [
    {
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
    },
  ],
});

module.exports = mongoose.model("User", schema);
