const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder')

const hostSchema = new mongoose.Schema({
    active: {
        type: Boolean
    },
    capacity: {
        type: Number
    },
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
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    bookedRange: [String],
    images: [String],
    address: {
            addressOne: {
                type: String
            },
            addressTwo: {
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            zip: {
                type: String
            }
    },
    addressFormat: {
        type: String,
        trim: true
    },
    usersYes: {
        type: Array,
        day: String,
        user: String
    },
    usersNo: {
        type: Array,
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
    const loc = await geocoder.geocode(this.addressFormat)
    this.loc = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude], 
        formattedAddress: loc[0].formattedAddress
    }
    this.addressFormat = undefined
    next()
})


module.exports = Host = mongoose.model('host', hostSchema)