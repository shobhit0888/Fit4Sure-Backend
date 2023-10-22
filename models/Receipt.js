const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    payment_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paid_on: {
        type: String,
        default: new Date().toLocaleDateString(),
    },
});

module.exports = mongoose.model('Receipt', schema);