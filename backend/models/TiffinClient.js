const mongoose = require('mongoose');

const tiffinClientSchema = new mongoose.Schema({
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
    clientFareBudget: {
        type: Number,
        required: true
    },
    clientDescription: {
        type: String,
        trim: true
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

module.exports = mongoose.model('TiffinClient', tiffinClientSchema);