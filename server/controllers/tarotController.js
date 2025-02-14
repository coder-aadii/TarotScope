const TarotCard = require('../models/TarotCard'); // Assuming this model is defined correctly

// Get all tarot cards
const getAllCards = async (req, res) => {
    try {
        const tarotCards = await TarotCard.find();
        res.status(200).json(tarotCards);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tarot cards' });
    }
};

// Variables to store "Card of the Day" and the date when it was selected
let cardOfTheDay = null;
let lastUpdatedDate = null;

// Get a random card of the day (stays the same for 24 hours)
const getRandomCardOfTheDay = async (req, res) => {
    const currentDate = new Date().toISOString().split('T')[0];  // Get current date (YYYY-MM-DD format)

    // If it's a new day or cardOfTheDay is not set, fetch a new random card
    if (!cardOfTheDay || lastUpdatedDate !== currentDate) {
        try {
            const tarotCards = await TarotCard.find();
            const randomIndex = Math.floor(Math.random() * tarotCards.length);
            cardOfTheDay = tarotCards[randomIndex];
            lastUpdatedDate = currentDate;  // Update the date
        } catch (error) {
            return res.status(500).json({ error: 'Failed to fetch card of the day' });
        }
    }

    res.status(200).json(cardOfTheDay);  // Return the card of the day
};

// Get three random tarot cards for a "Three-Card Spread"
const getThreeRandomCards = async (req, res) => {
    try {
        const tarotCards = await TarotCard.aggregate([{ $sample: { size: 3 } }]);  // MongoDB aggregation for random cards
        res.status(200).json(tarotCards);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch random cards' });
    }
};

module.exports = {
    getAllCards,
    getRandomCardOfTheDay,
    getThreeRandomCards
};
