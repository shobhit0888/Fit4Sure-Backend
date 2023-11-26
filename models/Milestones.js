const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  coaches: {
    type: String,
    require: true,
  },
  success_rate: {
    type: String,
    require: true,
  },
  lives_impacted: {
    type: String,
    require: true,
  },
  users_in_india: {
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

module.exports = mongoose.model("Milestones", schema);
