const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth');
const upload = require('../config/multer');
const Vehicle = require('../models/Vehicle');
const RideClient = require('../models/RideClient');

// Get all vehicles
router.get('/vehicles', auth, checkRole('driver'), async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
        res.json(vehicles);
    } catch (error) {
        console.error('Get vehicles error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add vehicle
router.post('/vehicles', auth, checkRole('driver'), upload.fields([
    { name: 'driverImage', maxCount: 1 },
    { name: 'vehicleImage', maxCount: 1 }
]), async (req, res) => {
    try {
        const vehicleData = {
            driverName: req.body.driverName,
            driverMobileNumber: req.body.driverMobileNumber,
            driverVehicleNumber: req.body.driverVehicleNumber,
            driverAddress: req.body.driverAddress,
            driverFare: req.body.driverFare,
            driverDescription: req.body.driverDescription,
            createdBy: req.user._id
        };

        if (req.files['driverImage']) {
            vehicleData.driverImage = req.files['driverImage'][0].path;
        }

        if (req.files['vehicleImage']) {
            vehicleData.vehicleImage = req.files['vehicleImage'][0].path;
        }

        const vehicle = new Vehicle(vehicleData);
        await vehicle.save();

        res.status(201).json(vehicle);
    } catch (error) {
        console.error('Add vehicle error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update vehicle
router.put('/vehicles/:id', auth, checkRole('driver'), upload.fields([
    { name: 'driverImage', maxCount: 1 },
    { name: 'vehicleImage', maxCount: 1 }
]), async (req, res) => {
    try {
        const vehicle = await Vehicle.findOne({ _id: req.params.id, createdBy: req.user._id });

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        const updateData = {
            driverName: req.body.driverName,
            driverMobileNumber: req.body.driverMobileNumber,
            driverVehicleNumber: req.body.driverVehicleNumber,
            driverAddress: req.body.driverAddress,
            driverFare: req.body.driverFare,
            driverDescription: req.body.driverDescription
        };

        if (req.files['driverImage']) {
            updateData.driverImage = req.files['driverImage'][0].path;
        }

        if (req.files['vehicleImage']) {
            updateData.vehicleImage = req.files['vehicleImage'][0].path;
        }

        Object.assign(vehicle, updateData);
        await vehicle.save();

        res.json(vehicle);
    } catch (error) {
        console.error('Update vehicle error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete vehicle
router.delete('/vehicles/:id', auth, checkRole('driver'), async (req, res) => {
    try {
        const vehicle = await Vehicle.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user._id
        });

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        console.error('Delete vehicle error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all ride clients
router.get('/clients', auth, checkRole('driver'), async (req, res) => {
    try {
        const clients = await RideClient.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
        res.json(clients);
    } catch (error) {
        console.error('Get clients error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add ride client
router.post('/clients', auth, checkRole('driver'), upload.single('clientImage'), async (req, res) => {
    try {
        const clientData = {
            clientName: req.body.clientName,
            clientMobileNumber: req.body.clientMobileNumber,
            clientAddress: req.body.clientAddress,
            clientFareBudget: req.body.clientFareBudget,
            clientDescription: req.body.clientDescription,
            createdBy: req.user._id
        };

        if (req.file) {
            clientData.clientImage = req.file.path;
        }

        const client = new RideClient(clientData);
        await client.save();

        res.status(201).json(client);
    } catch (error) {
        console.error('Add client error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update ride client
router.put('/clients/:id', auth, checkRole('driver'), upload.single('clientImage'), async (req, res) => {
    try {
        const client = await RideClient.findOne({ _id: req.params.id, createdBy: req.user._id });

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        const updateData = {
            clientName: req.body.clientName,
            clientMobileNumber: req.body.clientMobileNumber,
            clientAddress: req.body.clientAddress,
            clientFareBudget: req.body.clientFareBudget,
            clientDescription: req.body.clientDescription
        };

        if (req.file) {
            updateData.clientImage = req.file.path;
        }

        Object.assign(client, updateData);
        await client.save();

        res.json(client);
    } catch (error) {
        console.error('Update client error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete ride client
router.delete('/clients/:id', auth, checkRole('driver'), async (req, res) => {
    try {
        const client = await RideClient.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user._id
        });

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.json({ message: 'Client deleted successfully' });
    } catch (error) {
        console.error('Delete client error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;