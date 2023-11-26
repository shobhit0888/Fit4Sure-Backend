const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  image: {
    type: String,
  },
  title: {
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

module.exports = mongoose.model("Web-Services", schema);
