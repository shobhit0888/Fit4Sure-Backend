const mongoose = require("mongoose");

const LikesSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
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

module.exports = mongoose.model("Likes", LikesSchema);
