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
  is_liked: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Shortvideo_Likes", schema);
