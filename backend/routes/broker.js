const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth');
const upload = require('../config/multer');
const Property = require('../models/Property');
const PropertyClient = require('../models/PropertyClient');

// Get all properties
router.get('/properties', auth, checkRole('broker'), async (req, res) => {
    try {
        const properties = await Property.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
        res.json(properties);
    } catch (error) {
        console.error('Get properties error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add property
router.post('/properties', auth, checkRole('broker'), upload.fields([
    { name: 'propertyMedia', maxCount: 10 },
    { name: 'ownerImage', maxCount: 1 }
]), async (req, res) => {
    try {
        const propertyData = {
            ownerName: req.body.ownerName,
            ownerMobileNumber: req.body.ownerMobileNumber,
            propertyAddress: req.body.propertyAddress,
            propertyRent: req.body.propertyRent,
            propertyType: req.body.propertyType,
            propertyDescription: req.body.propertyDescription,
            createdBy: req.user._id
        };

        if (req.files['propertyMedia']) {
            propertyData.propertyMedia = req.files['propertyMedia'].map(file => file.path);
        }

        if (req.files['ownerImage']) {
            propertyData.ownerImage = req.files['ownerImage'][0].path;
        }

        const property = new Property(propertyData);
        await property.save();

        res.status(201).json(property);
    } catch (error) {
        console.error('Add property error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update property
router.put('/properties/:id', auth, checkRole('broker'), upload.fields([
    { name: 'propertyMedia', maxCount: 10 },
    { name: 'ownerImage', maxCount: 1 }
]), async (req, res) => {
    try {
        const property = await Property.findOne({ _id: req.params.id, createdBy: req.user._id });

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        const updateData = {
            ownerName: req.body.ownerName,
            ownerMobileNumber: req.body.ownerMobileNumber,
            propertyAddress: req.body.propertyAddress,
            propertyRent: req.body.propertyRent,
            propertyType: req.body.propertyType,
            propertyDescription: req.body.propertyDescription
        };

        if (req.files['propertyMedia']) {
            updateData.propertyMedia = req.files['propertyMedia'].map(file => file.path);
        }

        if (req.files['ownerImage']) {
            updateData.ownerImage = req.files['ownerImage'][0].path;
        }

        Object.assign(property, updateData);
        await property.save();

        res.json(property);
    } catch (error) {
        console.error('Update property error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete property
router.delete('/properties/:id', auth, checkRole('broker'), async (req, res) => {
    try {
        const property = await Property.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user._id
        });

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        console.error('Delete property error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all property clients
router.get('/clients', auth, checkRole('broker'), async (req, res) => {
    try {
        const clients = await PropertyClient.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
        res.json(clients);
    } catch (error) {
        console.error('Get clients error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add property client
router.post('/clients', auth, checkRole('broker'), upload.single('clientImage'), async (req, res) => {
    try {
        const clientData = {
            clientName: req.body.clientName,
            clientMobileNumber: req.body.clientMobileNumber,
            clientAddress: req.body.clientAddress,
            clientBudget: req.body.clientBudget,
            clientLookingForPropertyType: req.body.clientLookingForPropertyType,
            createdBy: req.user._id
        };

        if (req.file) {
            clientData.clientImage = req.file.path;
        }

        const client = new PropertyClient(clientData);
        await client.save();

        res.status(201).json(client);
    } catch (error) {
        console.error('Add client error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update property client
router.put('/clients/:id', auth, checkRole('broker'), upload.single('clientImage'), async (req, res) => {
    try {
        const client = await PropertyClient.findOne({ _id: req.params.id, createdBy: req.user._id });

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        const updateData = {
            clientName: req.body.clientName,
            clientMobileNumber: req.body.clientMobileNumber,
            clientAddress: req.body.clientAddress,
            clientBudget: req.body.clientBudget,
            clientLookingForPropertyType: req.body.clientLookingForPropertyType
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

// Delete property client
router.delete('/clients/:id', auth, checkRole('broker'), async (req, res) => {
    try {
        const client = await PropertyClient.findOneAndDelete({
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

module.exports = router