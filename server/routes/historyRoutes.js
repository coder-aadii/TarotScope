// Routes for fetching previous readings

const express = require('express');
const router = express.Router();
const History = require('../models/History');

// Get history for a user
router.get('/:userId', async (req, res) => {
  try {
    const history = await History.find({ userId: req.params.userId });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get history' });
  }
});

// Get the last history entry for a user
router.get('/last/:userId', async (req, res) => {
  try {
    const lastReading = await History.findOne({ userId: req.params.userId })
      .sort({ date: -1 })  // Sort by date in descending order to get the latest
      .limit(1);  // Return only the last entry

    if (!lastReading) {
      return res.status(404).json({ message: 'No history found for this user' });
    }

    res.status(200).json(lastReading);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get the last reading' });
  }
});

// Add history
router.post('/', async (req, res) => {
  try {
    const { userId, tarotCardIds, question, result } = req.body;
    const newHistory = new History({ userId, tarotCardIds, question, result });
    await newHistory.save();
    res.status(201).json(newHistory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add history' });
  }
});

module.exports = router;
