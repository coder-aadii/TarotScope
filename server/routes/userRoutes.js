const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');

const multer = require('multer');

// Define storage for images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify uploads folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

const upload = multer({ storage: storage });

// Register a user
router.post('/register', authController.registerUser);

// Login a user
router.post('/login', authController.loginUser);

// Fetch user profile by ID
router.get('/:userId', profileController.getUserProfile);

// Update user profile by ID
router.put('/update-profile/:id', upload.single('profileImage'), authController.updateUserProfile);

module.exports = router;
