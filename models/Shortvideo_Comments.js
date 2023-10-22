const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  shortvideo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShortVideo",
    required: true,
  },
  comment: {
    type: String,
    default: "",
  },
  created_at: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Shortvideo_comment", schema);
