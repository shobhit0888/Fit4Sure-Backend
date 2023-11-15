const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  video: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Homevideo2", schema);
