const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  stateOfResidence: {
    type: String,
  },
  test: {
    type: String,
  },
  created_at : {
    type: Date,
    default: Date.now(),
  }
});

module.exports = mongoose.model("User", schema);
