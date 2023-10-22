const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    food_name: {
        type: String,
    },
    food_image: {
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

module.exports = mongoose.model('Food_Type', Schema);