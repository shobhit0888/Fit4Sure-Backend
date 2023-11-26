const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  order_id: {
    type: String,
    require: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  subscription_plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    default: null,
  },
  trainer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainer",
    default: null,
  },
  plan_details: {
    type: String,
  },
  duration: {
    type: String,
    default: null,
  },
  amount: {
    type: Number,
    require: true,
  },
  currency: {
    type: String,
    require: true,
    default: "INR",
  },
  receipt_id: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
    default: "created",
  },
  payment_data: {
    type: mongoose.Schema.Types.Mixed,
  },
  invoice: {
    type: String,
  },
  created_at: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
  updated_at: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
  createdTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", schema);
