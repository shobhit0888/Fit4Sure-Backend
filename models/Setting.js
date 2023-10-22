const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  web_service_title: {
    type: String,
  },
  web_service_description: {
    type: String,
  },
  transformation_title: {
    type: String,
  },
  transformation_description: {
    type: String,
  },
  food_type_title: {
    type: String,
  },
  steps_title: {
    type: String,
  },
  steps_description: {
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

module.exports = mongoose.model("Setting", schema);
