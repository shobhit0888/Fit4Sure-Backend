const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  package_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PackageInclude", schema);
