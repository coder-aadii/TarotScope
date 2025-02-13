const express = require('express');
const router = express.Router();
const TarotCard = require('../models/TarotCard');

// Get all tarot cards
router.get('/', async (req, res) => {
  try {
    const tarotCards = await TarotCard.find();
    res.status(200).json(tarotCards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tarot cards' });
  }
});

// Get a random tarot card for the "Card of the Day"
router.get('/random', async (req, res) => {
  try {
    const count = await TarotCard.countDocuments(); // Get the total number of cards
    const random = Math.floor(Math.random() * count); // Generate a random index
    const randomCard = await TarotCard.findOne().skip(random); // Fetch the card at that index
    res.status(200).json(randomCard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch a random tarot card' });
  }
});

// Get three random tarot cards for the "Three-Card Spread"
router.get('/three-random', async (req, res) => {
  try {
    const count = await TarotCard.countDocuments(); // Get the total number of cards
    const randomIndexes = [];

    // Generate 3 unique random indexes
    while (randomIndexes.length < 3) {
      const randomIndex = Math.floor(Math.random() * count);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }

    // Fetch the 3 random cards
    const randomCards = await TarotCard.find().skip(randomIndexes[0]).limit(1)
      .concat(await TarotCard.find().skip(randomIndexes[1]).limit(1))
      .concat(await TarotCard.find().skip(randomIndexes[2]).limit(1));

    res.status(200).json(randomCards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch three random tarot cards' });
  }
});

module.exports = router;
