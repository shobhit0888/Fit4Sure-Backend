const mongoose = require("mongoose");

const DocumentsSchema = new mongoose.Schema({
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classes",
    required: true,
  },
  file: {
    type: String,
  },
  type: {
    type: String,
  },
  created_at: {
    type: String,
    default: Date,
  },
});

module.exports = mongoose.model("Documents", DocumentsSchema);
