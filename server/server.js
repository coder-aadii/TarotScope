// Entry point for the backend server

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the DB connection
const insightsRoutes = require('./routes/insightsRoutes'); // Import insights routes
const tarotRoutes = require('./routes/tarotRoutes'); // Import tarot card routes
const historyRoutes = require('./routes/historyRoutes'); // Import the history routes
const contactRoutes = require('./routes/contactRoutes');
const emailVerificationRoutes = require('./routes/emailVerificationRoutes'); // Import email verification routes
const userRoutes = require('./routes/userRoutes');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const logger = require('./utils/logger'); // Import custom logger
require('dotenv').config(); // Load environment variables from .env
require('./config/passport');  // Import passport configuration to initialize the Google OAuth strategy

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cookieParser()); // Add cookie parser before session

// Configure CORS
const allowedOrigins = [
    process.env.CLIENT_URL,
    'https://tarotscope.netlify.app',
    'http://localhost:3000'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With'],
    exposedHeaders: ['Authorization', 'Set-Cookie'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Enable pre-flight requests for all routes
app.options('*', cors());

// Initialize session BEFORE passport
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        touchAfter: 24 * 3600, // lazy session update
        collectionName: 'sessions'
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: 'lax'
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Debug middleware for auth - ONLY log in development
app.use((req, res, next) => {
    // Only log for specific routes in development environment
    if (req.url.includes('/api/auth/google') && process.env.NODE_ENV !== 'production') {
        logger.debug('\n=== Auth Debug ===');
        logger.debug('URL:', req.url);
        logger.debug('Session ID:', req.sessionID);
        logger.debug('Session:', req.session);
        logger.debug('User:', req.user);
        logger.debug('Is Authenticated:', req.isAuthenticated());
        logger.debug('==================\n');
    }
    
    // Always continue to next middleware
    next();
});

// Routes
app.use('/api/auth', userRoutes); // All auth and user-related routes under /api/auth
app.use('/api/tarotcards', tarotRoutes); // Tarot card routes
app.use('/api/insights', insightsRoutes); // Insights routes
app.use('/api/history', historyRoutes); // Register history routes under '/api/history'
app.use('/api/contact', contactRoutes);
app.use('/api/verify-email', emailVerificationRoutes); // Register email verification routes

// Basic route for health check
app.get('/', (req, res) => {
    res.send('TarotScope backend is working');
});

// 404 route handling
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));