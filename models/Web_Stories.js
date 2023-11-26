const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  occupation: {
    type: String,
    require: true,
  },
  weight_loss: {
    type: String,
    require: true,
  },
  description: {
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

module.exports = mongoose.model("Stories", schema);
