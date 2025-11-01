const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create upload directories if they don't exist
const createUploadDirs = () => {
  const dirs = [
    'uploads/properties',
    'uploads/clients',
    'uploads/vehicles',
    'uploads/caterers'
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

createUploadDirs();

// Helper function to sanitize folder names
const sanitizeFolderName = (name) => {
  return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')  // Replace special chars with underscore
      .replace(/_+/g, '_')          // Replace multiple underscores with single
      .replace(/^_|_$/g, '')        // Remove leading/trailing underscores
      .substring(0, 50);            // Limit length to 50 characters
};

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/';
    let entityName = '';

    if (req.baseUrl.includes('broker')) {
      if (req.body.type === 'client') {
        uploadPath += 'clients/';
        const clientName = req.body.clientName || 'clientName';
        const clientMobileNumber = req.body.clientMobileNumber || 'clientMobileNumber';
        entityName = `broker_${clientName}_${clientMobileNumber}`;
      } else {
        uploadPath += 'properties/';
        // Use ownerName and propertyType to create folder name
        const ownerName = req.body.ownerName || 'ownerName';
        const propertyType = req.body.propertyType || 'propertyType';
        entityName = `${ownerName}_${propertyType}`;
      }
    } else if (req.baseUrl.includes('driver')) {
      if (req.body.type === 'client') {
        uploadPath += 'clients/';
        const clientName = req.body.clientName || 'clientName';
        const clientMobileNumber = req.body.clientMobileNumber || 'clientMobileNumber';
        entityName = `driver_${clientName}_${clientMobileNumber}`;
      } else {
        uploadPath += 'vehicles/';
        const driverName = req.body.driverName || 'driverName';
        const driverVehicleNumber = req.body.driverVehicleNumber || 'driverVehicleNumber';
        entityName = `${driverName}_${driverVehicleNumber}`;
      }
    } else if (req.baseUrl.includes('mess')) {
      if (req.body.type === 'client') {
        uploadPath += 'clients/';
        const clientName = req.body.clientName || 'clientName';
        const clientMobileNumber = req.body.clientMobileNumber || 'clientMobileNumber';
        entityName = `mess_${clientName}_${clientMobileNumber}`;
      } else {
        uploadPath += 'caterers/';
        const catererName = req.body.catererName || 'catererName';
        const catererMobileNumber = req.body.catererMobileNumber || 'catererMobileNumber';
        entityName = `${catererName}_${catererMobileNumber}`;
      }
    }

    // Sanitize and create entity-specific folder
    const sanitizedName = sanitizeFolderName(entityName);
    uploadPath += sanitizedName + '/';

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only images and videos are allowed'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: fileFilter
});

module.exports = upload;
