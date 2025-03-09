// server/routes/insightsRoutes.js

const express = require('express');
const { getReadingStats, getCardFrequency } = require('../controllers/insightsController');

const router = express.Router();

// Define route to get reading statistics by userId
router.get('/readingStats/:userId', getReadingStats);

// Define route to get card frequency data by userId
router.get('/cardFrequency/:userId', getCardFrequency);

module.exports = router;
