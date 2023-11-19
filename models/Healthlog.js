const mongoose = require("mongoose");
const trackhealth = require("./trackhealth")
const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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

const Healthlog= mongoose.model("Healthlog", schema);
module.exports = Healthlog