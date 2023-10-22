const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
    },
});
module.exports = mongoose.model("Web_Apart", Schema);
