const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Ensure that the directory exists
const ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const targetDir = path.join(__dirname, '..', 'public', 'images');

        // Ensure the directory exists
        ensureDirectoryExists(targetDir);

        // Pass the target directory to multer
        cb(null, targetDir);
    },
    filename: (req, file, cb) => {
        // Use the original filename with a timestamp to ensure unique filenames
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

module.exports = upload;
