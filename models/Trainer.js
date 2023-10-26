const mongoose = require("mongoose");

const TrainerSchema = new mongoose.Schema({
  category: 
    {
      type: String,
      required: true,
    },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  experience_year: {
    type: String,
  },
  about: {
    type: String,
  },
  language: {
    type: String,
  },
  location: {
    type: String,
  },
  clients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  experties: {
    type: String,
  },
  image: {
    type: String,
  },
  bank_name: {
    type: String,
  },
  account_holder_name: {
    type: String,
  },
  account_no: {
    type: String,
  },
  ifsc_code: {
    type: String,
  },
  branch: {
    type: String,
  },
  upi: {
    type: String,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  wallet: {
    type: Number,
    default: 0,
  },
  people_trained: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  website_desc: {
    type: String,
  },
  created_at: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
  otp: {
    type: Number,
  },
  updated_at: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
});

module.exports = mongoose.model("Trainer", TrainerSchema);
