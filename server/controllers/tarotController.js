// Handles tarot reading logic

const TarotCard = require('../models/TarotCard'); // Import the TarotCard model

// Controller function to get a random card
exports.getRandomCard = async (req, res) => {
    try {
        const count = await TarotCard.countDocuments(); // Count total documents
        const randomIndex = Math.floor(Math.random() * count); // Generate a random index
        const randomCard = await TarotCard.findOne().skip(randomIndex); // Fetch a card using the random index
        res.json(randomCard); // Send the random card as JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching random card', error });
    }
};
