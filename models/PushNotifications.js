const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        default: null
    }, 
    description: {
        type: String,
        default: null
    }, 
    url: {
        type: String,
        default: null
    }, 
    image: {
        type: String,
        default: null
    }, 
    time: {
        type: String,
        default: null
    }, 
    selectedOption: {
        type: String,
        default: null
    }, 
    created_at: {
        type: String,
        default: Date.now,
    },
    updated_at: {
        type: String,
        default: Date.now,
    },
});

module.exports = mongoose.model('PushNotifications', schema);