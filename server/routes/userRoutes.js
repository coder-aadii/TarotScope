// Routes for user authentication

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyEmail } = require('../controllers/authController');

// Register a user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Email verification
router.get('/verify-email', verifyEmail);

module.exports = router;
