const express = require('express');
const router = express.Router();
const passport = require('passport'); // Import passport
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const auth = require('../middleware/auth'); // Import the auth middleware
const multer = require('multer');
const jwt = require('jsonwebtoken');

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

// Fetch authenticated user profile (with auth middleware)
router.get('/profile', auth, profileController.getUserProfile);

// Fetch user profile by ID
router.get('/:userId', profileController.getUserProfile);  // Still needed for other users' profiles

// Update user profile by ID
router.put('/update-profile/:id', auth, upload.single('profileImage'), authController.updateUserProfile);

// Google OAuth Routes
router.get('/google', (req, res, next) => {
    try {
        console.log('Starting Google OAuth flow');
        passport.authenticate('google', { 
            scope: ['profile', 'email'],
            session: true,
            prompt: 'select_account'
        })(req, res, next);
    } catch (error) {
        console.error('Error initiating Google OAuth:', error);
        res.redirect(`${process.env.CLIENT_URL}/login?googleError=true`);
    }
});

router.get('/google/callback', (req, res, next) => {
    console.log('Google callback received');
    
    passport.authenticate('google', { 
        failureRedirect: `${process.env.CLIENT_URL}/login?googleError=true`,
        session: true
    })(req, res, (err) => {
        if (err) {
            console.error('Error in Google authentication:', err);
            return res.redirect(`${process.env.CLIENT_URL}/login?googleError=true`);
        }

        try {
            console.log('Google auth successful, user:', req.user ? req.user._id : 'undefined');
            
            if (!req.user) {
                console.error('No user in request after Google auth');
                return res.redirect(`${process.env.CLIENT_URL}/login?googleError=true`);
            }
            
            // Generate JWT token
            const token = jwt.sign(
                { 
                    userId: req.user._id,
                    email: req.user.email,
                    name: req.user.name
                }, 
                process.env.JWT_SECRET, 
                { expiresIn: '24h' }
            );
            
            console.log('Generated token, redirecting to dashboard');
            
            // Set token in cookie and localStorage
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: 'lax'
            });

            // Redirect to dashboard with success
            res.redirect(`${process.env.CLIENT_URL}/dashboard`);
        } catch (error) {
            console.error('Error in Google callback handler:', error);
            res.redirect(`${process.env.CLIENT_URL}/login?googleError=true`);
        }
    });
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { 
            console.error("Logout error:", err);
            return res.status(500).json({ error: 'Error logging out' }); 
        }
        // Clear the token cookie
        res.clearCookie('token');
        res.redirect(`${process.env.CLIENT_URL}/login`);
    });
});

module.exports = router;