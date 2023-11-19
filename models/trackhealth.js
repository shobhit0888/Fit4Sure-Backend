const mongoose = require("mongoose");
const Trackhealth = new mongoose.Schema({
  BMI: {
    type: Number,
    default: 1
  },
  BMR: {
    type: Number,
  },
  BFP: {
    type: Number,
  },
  IBW: {
    thisype: Number,
  },
  TDEE: {
    type: Number,
  },
  WHR: {
    type: Number,
  },
  ABSI: {
    type: Number,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Trackhealth", Trackhealth);
// module.exports = Trackhealth;
