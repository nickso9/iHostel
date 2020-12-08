const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    accountType: {
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 5
    },
    userName: {
        type: String,
    },
    userBooked: {
        type: Array
    },
    images: {
        type: [String]
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String
    },
    userHistory: {
        type: Array,
        address: String,
        price: String,
        day: String,
        host: String
    }
});

module.exports = User = mongoose.model('user', userSchema)