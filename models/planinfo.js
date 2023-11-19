const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", unique: true },
  status: { type: String, default: "active" },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer" },
  duration: { type: Number },
  endDate: { type: Date },
});

module.exports = mongoose.model("planinfo", schema)