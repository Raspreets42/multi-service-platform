const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: true,
        trim: true
    },
    ownerMobileNumber: {
        type: String,
        required: true,
        trim: true
    },
    propertyAddress: {
        type: String,
        required: true,
        trim: true
    },
    propertyRent: {
        type: Number,
        required: true
    },
    propertyType: {
        type: String,
        required: true,
        enum: ['1BHK', '2BHK', '3BHK', 'PG', 'HOSTEL']
    },
    propertyDescription: {
        type: String,
        trim: true
    },
    propertyMedia: [{
        type: String // File paths
    }],
    ownerImage: {
        type: String // Optional owner picture
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Property', propertySchema);