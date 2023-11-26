const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  package_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
    default: null,
  },
  plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
  },
  duration: {
    type: String,
    default: null,
  },
  sessoin_per_week: {
    type: String,
    default: null,
  },
  date_time: {
    type: String,
    require: true,
  },
  status: {
    type: Number,
    require: true,
    default: 0,
  },
  created_at: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
  updated_at: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
});

module.exports = mongoose.model("Appointment", schema);
