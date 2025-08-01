const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const logger = require('../utils/logger');

// Only configure Google Strategy if credentials are available
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_CALLBACK_URL) {
    logger.debug('Configuring Google OAuth Strategy');
    
    // Configure the Google strategy
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            logger.debug('Google OAuth profile received:', {
                id: profile.id,
                name: profile.displayName,
                email: profile.emails?.[0]?.value
            });

            if (!profile.emails || !profile.emails[0].value) {
                logger.error('No email found in Google profile');
                return done(null, false, { message: 'No email found in Google profile' });
            }

            const email = profile.emails[0].value;
            
            try {
                // First try to find by googleId
                let user = await User.findOne({ googleId: profile.id });
                
                if (!user) {
                    // If not found by googleId, try by email
                    user = await User.findOne({ email: email });
                    
                    if (user) {
                        // User exists with this email but no googleId, link accounts
                        logger.debug('Linking Google account to existing user with email:', email);
                        user.googleId = profile.id;
                        await user.save();
                    } else {
                        // Create new user
                        logger.debug('Creating new user from Google profile');
                        user = new User({
                            googleId: profile.id,
                            name: profile.displayName,
                            email: email,
                            verified: true
                        });
                        await user.save();
                        logger.debug('New user created with ID:', user._id);
                    }
                } else {
                    logger.debug('Existing Google user found:', user._id);
                }
                
                return done(null, user);
            } catch (dbError) {
                logger.error('Database error during Google auth:', dbError);
                return done(dbError);
            }
        } catch (error) {
            logger.error('Error in Google Strategy:', error);
            return done(error);
        }
    }));
} else {
    logger.debug('Google OAuth credentials not found. Google authentication will not be available.');
}

// Serialize just the user ID to the session
passport.serializeUser((user, done) => {
    logger.debug('Serializing user ID:', user._id);
    done(null, user._id);
});

// Deserialize user from the session ID
passport.deserializeUser(async (id, done) => {
    try {
        logger.debug('Deserializing user ID:', id);
        const user = await User.findById(id);
        if (!user) {
            logger.debug('User not found during deserialization');
            return done(null, false);
        }
        logger.debug('User found during deserialization:', user._id);
        done(null, user);
    } catch (err) {
        logger.error('Error deserializing user:', err);
        done(err, null);
    }
});
