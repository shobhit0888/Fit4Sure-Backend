const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date().toLocaleDateString(),
  },
  update_at: {
    type: Date,
    default: new Date().toLocaleDateString(),
  },
});

module.exports = mongoose.model("Fit_Provides", schema);
