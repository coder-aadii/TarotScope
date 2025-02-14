const express = require('express');
const router = express.Router();
const { getAllCards, getRandomCardOfTheDay, getThreeRandomCards } = require('../controllers/tarotController');

// Route to get all tarot cards
router.get('/all', getAllCards);

// Route to get a random tarot card (Card of the Day)
router.get('/day', getRandomCardOfTheDay);

// Route to get three random tarot cards for the "Three-Card Spread"
router.get('/random-three', getThreeRandomCards);

module.exports = router;
