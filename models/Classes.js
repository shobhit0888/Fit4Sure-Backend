const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  trainer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainer",
  },
  link: {
    type: String,
    required: false,
    default: null,
  },
  datetime: {
    type: Date,
    required: false,
    default: new Date().toLocaleDateString(),
  },
  meeting_id: {
    type: String,
    required: false,
    default: null,
  },
  meeting_password: {
    type: String,
    required: false,
    default: null,
  },
  date: {
    type: String,
    required: false,
    default: null,
  },
  time: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    default: "Pending",
  },
  created_at: {
    type: String,
    default: Date,
  },
});

module.exports = mongoose.model("classes", ClassSchema);
