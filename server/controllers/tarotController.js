const TarotCard = require('../models/TarotCard');
const History = require('../models/History');
const mongoose = require('mongoose');
const aiClient = require('../utils/aiClient');
const logger = require('../utils/logger');

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
    logger.debug('Request body:', req.body);

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
        logger.info('Reading history saved successfully');

        // Respond with a success message
        res.status(201).json({ message: 'Reading history saved successfully' });
    } catch (error) {
        // Log error details for debugging
        logger.error('Error saving reading history:', error);

        // Respond with a server error message
        res.status(500).json({ error: 'Error saving reading history' });
    }
};

// Tarot interpretation handler
const getTarotInterpretation = async (req, res) => {
    try {
        const { question, selectedCards, questionType } = req.body;

        // Get user's name if authenticated
        const userName = req.user?.name || null;

        // Log the request data for debugging
        logger.debug('Tarot interpretation request:', { 
            question, 
            questionType,
            cardCount: selectedCards?.length || 0,
            userName: userName || 'anonymous'
        });

        // Create the prompt using our utility (with user's name if available)
        const prompt = aiClient.createTarotPrompt(question, questionType, selectedCards, userName);
        
        // Generate the reading using the AI client
        const generatedText = await aiClient.generateReading(prompt, {
            maxTokens: 500,
            temperature: 0.8,
            topP: 0.9
        });

        // Structure the response with all relevant information
        const structuredResponse = {
            question,
            questionType,
            cards: selectedCards.map((card, index) => ({
                position: index + 1,
                name: card.name,
                isReversed: card.isReversed,
                meaning: card.isReversed 
                    ? card.meanings?.reversed?.[questionType] || card.meanings?.reversed?.general
                    : card.meanings?.upright?.[questionType] || card.meanings?.upright?.general,
            })),
            interpretation: generatedText,
        };

        // Send the formatted response
        res.status(200).json(structuredResponse);

    } catch (error) {
        // Comprehensive error handling
        logger.error('Error generating tarot interpretation:', error);
        
        // Determine the appropriate status code and error message
        const statusCode = error.status || 500;
        const errorMessage = error.message || 'Failed to generate tarot reading';
        
        // Send the error response
        res.status(statusCode).json({ 
            error: errorMessage,
            details: error.data || error.message
        });
    }
};

module.exports = {
    getAllCards,
    getRandomCardOfTheDay,
    getThreeRandomCards,
    saveReadingHistory,
    getTarotInterpretation
};