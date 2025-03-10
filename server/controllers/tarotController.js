const { pipeline } = require('@huggingface/transformers');
const TarotCard = require('../models/TarotCard');
const History = require('../models/History');
const mongoose = require('mongoose');

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
        const tarotCards = await TarotCard.aggregate([{ $sample: { size: 3 } }]);  // Fetch 3 random cards

        // Add upright/reversed status and select corresponding meaning for each card
        const threeCardsWithPosition = tarotCards.map(card => {
            const isReversed = Math.random() < 0.5;  // Randomly decide if card is reversed (50% chance)
            const meaning = isReversed ? card.meanings.reversed : card.meanings.upright;

            return {
                ...card,
                isReversed,
                meaning
            };
        });

        res.status(200).json(threeCardsWithPosition);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch random cards' });
    }
};

// Controller to save reading history
const saveReadingHistory = async (req, res) => {
    const { selectedCards, question } = req.body;

    // Assuming req.user is populated by authentication middleware (JWT decoding, etc.)
    const userId = req.user && req.user._id;

    // If userId is not present, return a 401 Unauthorized error
    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    // Log the request body to ensure data is being received correctly
    console.log('Request body:', req.body);

    try {
        // Create a new History document with the provided data
        const newHistory = new History({
            userId: mongoose.Types.ObjectId(userId),
            selectedCards,
            question,
            date: new Date(),
        });

        // Save the new history entry to the database
        await newHistory.save();

        // Log success message
        console.log('Reading history saved successfully');

        // Respond with a success message
        res.status(201).json({ message: 'Reading history saved successfully' });
    } catch (error) {
        // Log error details for debugging
        console.error('Error saving reading history:', error);

        // Respond with a server error message
        res.status(500).json({ error: 'Error saving reading history' });
    }
};

const axios = require('axios');

// Hugging Face Inference API call for tarot reading generation
const getTarotInterpretation = async (req, res) => {
    try {
        const { question, selectedCards } = req.body;

        // Prepare the prompt with selected cards and question
        const cardDetails = selectedCards.map(card => `${card.name} (${card.isReversed ? 'Reversed' : 'Upright'}): ${card.meaning}`).join('\n');
        const prompt = `Question: "${question}"\nSelected Cards:\n${cardDetails}\nProvide a detailed tarot reading based on this.`;

        // Create a text generation pipeline with Hugging Face model
        const generator = await pipeline(
            "text-generation",
            "HuggingFaceTB/SmolLM2-1.7B-Instruct",
        );

        // Define the messages
        const messages = [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt },
        ];

        // Generate a response
        const output = await generator(messages, { max_new_tokens: 128 });

        const tarotInterpretation = output[0].generated_text.at(-1).content;

        // Send back the tarot interpretation to the frontend
        res.status(200).json({ interpretation: tarotInterpretation });
    } catch (error) {
        console.error('Error generating tarot interpretation:', error);
        res.status(500).json({ error: 'Failed to generate tarot reading' });
    }
};

module.exports = {
    getAllCards,
    getRandomCardOfTheDay,
    getThreeRandomCards,
    saveReadingHistory,
    getTarotInterpretation
};
