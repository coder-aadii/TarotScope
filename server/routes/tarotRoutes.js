// Routes for tarot reading logic

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

// Add a tarot card
router.post('/', async (req, res) => {
  try {
    const { name, description, uprightMeaning, reversedMeaning, image } = req.body;
    const newTarotCard = new TarotCard({ name, description, uprightMeaning, reversedMeaning, image });
    await newTarotCard.save();
    res.status(201).json(newTarotCard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add tarot card' });
  }
});

module.exports = router;
