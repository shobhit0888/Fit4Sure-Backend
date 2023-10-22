const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    col_one: {
        type: String,
    },
    col_two: {
        type: String,
    },
    col_three: {
        type: String,
    },
    col_four: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Counting', Schema);