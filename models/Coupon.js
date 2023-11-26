const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  // user_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  image: {
    type: String,
  },
  coupon_name: {
    type: String,
  },
  coupon_code: {
    type: String,
  },
  valid_start_date: {
    type: String,
  },
  valid_expiry_date: {
    type: String,
  },
  status: {
    type: String,
  },

  is_used: {
    type: Boolean,
    default: false,
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

module.exports = mongoose.model("Coupon", schema);
