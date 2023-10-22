const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  basename: {
    type: String,
    max: 50,
    required: true,
  },
  created_at: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Banner", Schema);
