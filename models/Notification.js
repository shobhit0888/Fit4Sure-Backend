const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notification", schema);
