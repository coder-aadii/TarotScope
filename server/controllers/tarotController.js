const TarotCard = require('../models/TarotCard');
const History = require('../models/History');
const mongoose = require('mongoose');
const huggingFaceClient = require('../utils/huggingFaceClient');

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

// Tarot interpretation handler
const getTarotInterpretation = async (req, res) => {
    try {
        const { question, selectedCards, questionType } = req.body;

        // Log the request data for debugging
        console.log('Tarot interpretation request:', { 
            question, 
            questionType,
            cardCount: selectedCards?.length || 0
        });

        // Create the prompt using our utility
        const prompt = huggingFaceClient.createTarotPrompt(question, questionType, selectedCards);
        
        // Generate the reading using the Hugging Face client
        const generatedText = await huggingFaceClient.generateReading(prompt, {
            maxTokens: 300,
            temperature: 0.7,
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
        console.error('Error generating tarot interpretation:', error);
        
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

/*

// Tarot interpretation handler
const getTarotInterpretation = async (req, res) => {
    try {
        const { question, selectedCards, questionType } = req.body;

        // Prepare the card details, simplified to just card names and brief meanings
        const cardDetails = selectedCards
            .map(card => {
                let meaning;

                // Select the appropriate meaning based on the orientation and questionType
                if (!card.meaning) {
                    meaning = 'No meaning available';
                } else if (card.isReversed) {
                    meaning = card.meaning.reversed?.[questionType] || card.meaning.reversed?.general || 'No reversed meaning available';
                } else {
                    meaning = card.meaning.upright?.[questionType] || card.meaning.upright?.general || 'No upright meaning available';
                }

                return `${card.name} (${card.isReversed ? 'Reversed' : 'Upright'}): ${meaning}`;
            })
            .join('\n');

        // Simplified prompt for the AI
        const prompt = `Question: "${question}"\nCards:\n${cardDetails}\nProvide a tarot interpretation based on the cards and question in about 100 words. And I strictly advise you to not include the information related to question typecard details in the interpretation, just include the interpretation only.`;

        // Log the prompt for debugging
        console.log('Generated prompt:', prompt);

        // Define the Hugging Face API URL and key
        const apiUrl = process.env.HF_API_URL || 'https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B-Instruct';
        const apiKey = process.env.HF_API_KEY;

        const response = await axios.post(
            apiUrl,
            { inputs: prompt, parameters: { max_tokens: 300 } }, // Keep max_tokens limited for concise answers
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
                timeout: 10000, // Timeout of 10 seconds
            }
        );

        // Handle the API response
        if (Array.isArray(response.data) && response.data.length > 0 && response.data[0].generated_text) {
            const generatedText = response.data[0].generated_text.trim(); // Clean up the response

            // Structure the response
            const structuredResponse = {
                question,
                questionType,
                cards: selectedCards.map((card) => ({
                    name: card.name,
                    isReversed: card.isReversed,
                    meaning: card.isReversed
                        ? card.meaning.reversed?.[questionType] || card.meaning.reversed?.general || 'No reversed meaning available'
                        : card.meaning.upright?.[questionType] || card.meaning.upright?.general || 'No upright meaning available',
                })),
                interpretation: generatedText, // Use the cleaned-up interpretation
            };

            // Send the formatted response
            res.status(200).json(structuredResponse);
        } else {
            console.error('Invalid API response:', response.data);
            res.status(500).json({ error: 'Invalid API response from Hugging Face' });
        }

    } catch (error) {
        // Improved error logging
        console.error('Error generating tarot interpretation:', error.message || error.response || error);
        res.status(500).json({ error: 'Failed to generate tarot reading' });
    }
};
*/

module.exports = {
    getAllCards,
    getRandomCardOfTheDay,
    getThreeRandomCards,
    saveReadingHistory,
    getTarotInterpretation
};
