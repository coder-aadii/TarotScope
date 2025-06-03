const express = require('express');
const router = express.Router();
const History = require('../models/History'); // History model
const User = require('../models/User'); // User model
const { getAllCards, getRandomCardOfTheDay, getThreeRandomCards, getTarotInterpretation } = require('../controllers/tarotController');
const verifyToken = require('../middleware/verifyToken'); // JWT middleware
const logger = require('../utils/logger');

// Route to get all tarot cards
router.get('/all', getAllCards);

// Route to get a random tarot card (Card of the Day)
router.get('/day', getRandomCardOfTheDay);

// Route to get three random tarot cards
router.get('/three-random-cards', getThreeRandomCards);

// POST: Add tarot card history
router.post('/history', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); // Ensure req.user is set in verifyToken

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new history record
    const newHistory = new History({
      userId: user._id,
      selectedCards: req.body.selectedCards,
      question: req.body.question,
    });

    await newHistory.save();

    return res.status(201).json({
      message: 'Tarot card history saved successfully',
      history: newHistory,
    });
  } catch (error) {
    logger.error('Error saving tarot card history:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// POST: Generate AI Tarot interpretation
router.post('/interpretation', getTarotInterpretation);

module.exports = router;
