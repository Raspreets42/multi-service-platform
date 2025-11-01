const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth');
const upload = require('../config/multer');
const Caterer = require('../models/Caterer');
const TiffinClient = require('../models/TiffinClient');

// Get all caterers
router.get('/caterers', auth, checkRole('caterer'), async (req, res) => {
    try {
        const caterers = await Caterer.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
        res.json(caterers);
    } catch (error) {
        console.error('Get caterers error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add caterer
router.post('/caterers', auth, checkRole('caterer'), upload.single('catererImage'), async (req, res) => {
    try {
        const catererData = {
            catererName: req.body.catererName,
            catererMobileNumber: req.body.catererMobileNumber,
            catererAddress: req.body.catererAddress,
            catererFare: req.body.catererFare,
            catererDescription: req.body.catererDescription,
            createdBy: req.user._id
        };

        if (req.file) {
            catererData.catererImage = req.file.path;
        }

        const caterer = new Caterer(catererData);
        await caterer.save();

        res.status(201).json(caterer);
    } catch (error) {
        console.error('Add caterer error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update caterer
router.put('/caterers/:id', auth, checkRole('caterer'), upload.single('catererImage'), async (req, res) => {
    try {
        const caterer = await Caterer.findOne({ _id: req.params.id, createdBy: req.user._id });

        if (!caterer) {
            return res.status(404).json({ message: 'Caterer not found' });
        }

        const updateData = {
            catererName: req.body.catererName,
            catererMobileNumber: req.body.catererMobileNumber,
            catererAddress: req.body.catererAddress,
            catererFare: req.body.catererFare,
            catererDescription: req.body.catererDescription
        };

        if (req.file) {
            updateData.catererImage = req.file.path;
        }

        Object.assign(caterer, updateData);
        await caterer.save();

        res.json(caterer);
    } catch (error) {
        console.error('Update caterer error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete caterer
router.delete('/caterers/:id', auth, checkRole('caterer'), async (req, res) => {
    try {
        const caterer = await Caterer.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user._id
        });

        if (!caterer) {
            return res.status(404).json({ message: 'Caterer not found' });
        }

        res.json({ message: 'Caterer deleted successfully' });
    } catch (error) {
        console.error('Delete caterer error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all tiffin clients
router.get('/clients', auth, checkRole('caterer'), async (req, res) => {
    try {
        const clients = await TiffinClient.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
        res.json(clients);
    } catch (error) {
        console.error('Get clients error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add tiffin client
router.post('/clients', auth, checkRole('caterer'), upload.single('clientImage'), async (req, res) => {
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

        const client = new TiffinClient(clientData);
        await client.save();

        res.status(201).json(client);
    } catch (error) {
        console.error('Add client error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update tiffin client
router.put('/clients/:id', auth, checkRole('caterer'), upload.single('clientImage'), async (req, res) => {
    try {
        const client = await TiffinClient.findOne({ _id: req.params.id, createdBy: req.user._id });

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

// Delete tiffin client
router.delete('/clients/:id', auth, checkRole('caterer'), async (req, res) => {
    try {
        const client = await TiffinClient.findOneAndDelete({
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