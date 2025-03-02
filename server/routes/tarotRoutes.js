const express = require('express');
const router = express.Router();
const History = require('../models/History'); // Assuming this is your history model
const User = require('../models/User'); // Assuming this is your user model
const { getAllCards, getRandomCardOfTheDay, getThreeRandomCards } = require('../controllers/tarotController');
const verifyToken = require('../middleware/verifyToken'); // JWT authentication middleware

// Route to get all tarot cards
router.get('/all', getAllCards);

// Route to get a random tarot card (Card of the Day)
router.get('/day', getRandomCardOfTheDay);

// Route to get three random tarot cards
router.get('/three-random-cards', getThreeRandomCards);

// POST: Add tarot card history
router.post('/history', verifyToken, async (req, res) => {
  try {
    // Use req.user (set in verifyToken) to fetch the user from the database
    const user = await User.findById(req.user.userId); // Assuming 'userId' is in the token payload

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new history record for the user
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
    console.error('Error saving tarot card history:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
