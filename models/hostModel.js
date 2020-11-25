const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder')

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
            type: String,
            trim: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
    }, 

});

hostSchema.pre('save', async function(next) {
    console.log(this.address)
    const loc = await geocoder.geocode(this.address)
    console.log(loc)
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude], 
        formattedAddress: loc[0].formattedAddress
    }

    this.address = undefined
    next()
})


module.exports = User = mongoose.model('host', hostSchema)