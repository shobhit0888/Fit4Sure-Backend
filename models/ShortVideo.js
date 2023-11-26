const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  approved: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("ShortVideo", schema);
