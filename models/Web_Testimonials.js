const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: {
        type: String,
    },
    sub_title: {
        type: String,
    },
    description: {
        type: String,
    },
    link : {
        type: String,
    },
    image: {
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

module.exports = mongoose.model('Web-Testimonials', Schema);