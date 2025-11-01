const mongoose = require('mongoose');

const catererSchema = new mongoose.Schema({
    catererName: {
        type: String,
        required: true,
        trim: true
    },
    catererMobileNumber: {
        type: String,
        required: true,
        trim: true
    },
    catererAddress: {
        type: String,
        required: true,
        trim: true
    },
    catererFare: {
        type: Number,
        required: true
    },
    catererDescription: {
        type: String,
        trim: true
    },
    catererImage: {
        type: String // Optional caterer picture
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Caterer', catererSchema);