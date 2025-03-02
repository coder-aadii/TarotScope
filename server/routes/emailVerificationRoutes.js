const express = require('express');
const router = express.Router();
const emailVerificationController = require('../controllers/emailVerificationController'); // Import the new controller

// Email verification route
router.get('/verify-email', emailVerificationController.verifyEmail);

module.exports = router;
