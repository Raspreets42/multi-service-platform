const mongoose = require('mongoose');

const propertyClientSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true,
        trim: true
    },
    clientMobileNumber: {
        type: String,
        required: true,
        trim: true
    },
    clientAddress: {
        type: String,
        required: true,
        trim: true
    },
    clientBudget: {
        type: Number,
        required: true
    },
    clientLookingForPropertyType: {
        type: String,
        required: true,
        enum: ['1BHK', '2BHK', '3BHK', 'PG', 'HOSTEL']
    },
    clientImage: {
        type: String // Optional client picture
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PropertyClient', propertyClientSchema);