const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  Trainer: {
    type: String,
    require: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  Like: {
    type: Number,
  },
  heading: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  date_time: {
    type: String,
    require: true,
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

module.exports = mongoose.model("Blog", schema);
