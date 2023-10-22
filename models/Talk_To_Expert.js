const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title : {
        type : String,
    },
    description : {
        type : String,
    },
    description2 : {
        type : String,
    },
    export : {
        type : String,
    },
    created_at : {
        type : Date,
        default : Date.now,
    },
    updated_at : {
        type : Date,
        default : Date.now,
    },

});

module.exports = mongoose.model('Talk_To_Expert', Schema);