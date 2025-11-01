const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    driverName: {
        type: String,
        required: true,
        trim: true
    },
    driverMobileNumber: {
        type: String,
        required: true,
        trim: true
    },
    driverVehicleNumber: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    driverAddress: {
        type: String,
        required: true,
        trim: true
    },
    driverFare: {
        type: Number,
        required: true
    },
    driverDescription: {
        type: String,
        trim: true
    },
    driverImage: {
        type: String // Optional driver picture
    },
    vehicleImage: {
        type: String // Optional vehicle picture
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Vehicle', vehicleSchema);