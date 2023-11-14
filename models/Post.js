const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  Trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainer",
  },
  image: {
    type: String,
  },
  text: {
    type: String,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  
  date: {
    type: Date,
    required: false,
    default: Date.now,
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


module.exports = mongoose.model("Post", schema);
