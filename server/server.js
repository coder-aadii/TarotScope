// Entry point for the backend server

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the DB connection
const insightsRoutes = require('./routes/insightsRoutes'); // Import insights routes
const tarotRoutes = require('./routes/tarotRoutes'); // Import tarot card routes
const historyRoutes = require('./routes/historyRoutes'); // Import the history routes

require('dotenv').config(); // Load environment variables from .env

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

// Routes
app.use('/api/auth', require('./routes/userRoutes')); // User routes (auth routes for register, login, etc.)
app.use('/api/history', require('./routes/historyRoutes')); // History routes
app.use('/api/tarotcards', tarotRoutes); // Tarot card routes
app.use('/api/insights', insightsRoutes); // Insights routes
app.use('/api/user', require('./routes/userRoutes')); // User routes for fetching profile
app.use('/api/history', historyRoutes); // Register history routes under '/api/history'

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
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
