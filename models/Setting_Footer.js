const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    playstore_link: {
        type: String,
    },
    appstore_link: {
        type: String,
    },
    youtube_link: {
        type: String,
    },
    instagram_link: {
        type: String,
    },
    twitter_link: {
        type: String,
    },
    facebook_link: {
        type: String,
    },
    description: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,

    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Setting_Footer", Schema);