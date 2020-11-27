const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder')

const hostSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    userName: {
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
    bookedRange: [String],
    images: [String],
    address: {
            type: String,
            trim: true
    },
    usersYes: {
        type: Array,
    },
    usersNo: {
        type: [String],
    },
    loc: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: { 
                type: '2d', 
                sparse: true 
            }
        },
        formattedAddress: String,
    }, 

});

hostSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address)
    this.loc = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude], 
        formattedAddress: loc[0].formattedAddress
    }
    this.address = undefined
    next()
})


module.exports = Host = mongoose.model('host', hostSchema)