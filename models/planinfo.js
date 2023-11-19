const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    plan: {type: mongoose.Schema.Types.ObjectId,
            ref: "Plan"},
    status: {type: String, default:"active"}
})

module.exports = mongoose.model("planinfo", schema)