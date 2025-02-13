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
