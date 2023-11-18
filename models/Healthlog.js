const mongoose = require("mongoose");
const trackhealth = require("./trackhealth")
const Healthlog = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  record: [trackhealth]
});

const HealthlogModel = mongoose.model("Healthlog", Healthlog);
