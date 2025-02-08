// Entry point for the backend server

// Entry point for the backend server

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the DB connection
require('dotenv').config(); // Load environment variables from .env

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Basic route
app.get('/', (req, res) => {
  res.send('AuraDeck backend is working');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
