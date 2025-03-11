const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Log the callback URL for debugging
console.log('Configuring Passport with callback URL:', process.env.GOOGLE_CALLBACK_URL);

// Configure the Google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log('Google OAuth profile received:', {
                id: profile.id,
                name: profile.displayName,
                email: profile.emails?.[0]?.value
            });

            if (!profile.emails || !profile.emails[0].value) {
                console.error('No email found in Google profile');
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
                        console.log('Linking Google account to existing user with email:', email);
                        user.googleId = profile.id;
                        await user.save();
                    } else {
                        // Create new user
                        console.log('Creating new user from Google profile');
                        user = new User({
                            googleId: profile.id,
                            name: profile.displayName,
                            email: email,
                            verified: true
                        });
                        await user.save();
                        console.log('New user created with ID:', user._id);
                    }
                } else {
                    console.log('Existing Google user found:', user._id);
                }
                
                return done(null, user);
            } catch (dbError) {
                console.error('Database error during Google auth:', dbError);
                return done(dbError);
            }
        } catch (error) {
            console.error('Error in Google Strategy:', error);
            return done(error);
        }
    }
));

// Serialize just the user ID to the session
passport.serializeUser((user, done) => {
    console.log('Serializing user ID:', user._id);
    done(null, user._id);
});

// Deserialize user from the session ID
passport.deserializeUser(async (id, done) => {
    try {
        console.log('Deserializing user ID:', id);
        const user = await User.findById(id);
        if (!user) {
            console.log('User not found during deserialization');
            return done(null, false);
        }
        console.log('User found during deserialization:', user._id);
        done(null, user);
    } catch (err) {
        console.error('Error deserializing user:', err);
        done(err, null);
    }
});
