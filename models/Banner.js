const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  basename: {
    type: String,
    max: 50,
    required: true,
  },
  image: {
    type: String
  },
  created_at: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Banner", Schema);
