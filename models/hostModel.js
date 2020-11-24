const mongoose = require('mongoose');

const hostSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    price: {
        type: Number,
        require: true,
    },
    title: {
        type: String,
        require: true,
        minlength: 1
    },
    description: {
        type: String,
        minlength: 1
    },
    range: [String],
    bookedRage: [String],
    images: [String],
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
    },
    loc: {
        type: { 
            type: String 
        },
        coordinates: []
    }, 

});

module.exports = User = mongoose.model('host', hostSchema)