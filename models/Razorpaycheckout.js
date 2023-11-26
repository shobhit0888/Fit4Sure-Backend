const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  payment_id: {
    type: String,
    require: true,
  },
  order_id: {
    type: String,
    require: true,
  },
  signature: {
    type: String,
    require: true,
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

moduel.exports = mongoose.model("Razorpaycheckout", schema);
