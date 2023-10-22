const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    max: 50,
    required: true,
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

module.exports = mongoose.model("Category", schema);