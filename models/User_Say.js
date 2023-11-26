const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    created_at: {
        type: String,
        default: new Date().toLocaleDateString(),
    },
    updated_at: {
        type: String,
        default: new Date().toLocaleDateString(),

    },
});

module.exports = mongoose.model("User-Say", Schema);