const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  contact_name: {
    type: String,
    max: 50,
  },
  email: {
    type: String,
    max: 50,
    default: "null",
  },
  country : {
    type: String,
  },
  city: {
    type: String,
 },
    phone: {
    type: String,
    },
    gender : {
    type: String,
    },
    concern : {
    type: String,
    },
    time : {
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

module.exports = mongoose.model("Web-Contact", Schema);
