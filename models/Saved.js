const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  shortVideo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShortVideo",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
module.exports = mongoose.model("Saved", Schema);
