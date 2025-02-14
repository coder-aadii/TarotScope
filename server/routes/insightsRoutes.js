// server/routes/insightsRoutes.js

const express = require('express');
const { getReadingStats, getCardFrequency } = require('../controllers/insightsController');

const router = express.Router();

// Define route to get reading statistics
router.get('/readingStats', getReadingStats);

// Define route to get card frequency data
router.get('/cardFrequency', getCardFrequency);

module.exports = router;
