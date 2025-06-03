// scripts/seedTarotCards.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const TarotCard = require('../models/TarotCard');
const logger = require('../utils/logger');

dotenv.config(); // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Tarot card data (example with images and meanings)
const tarotCards = [
    {
        name: 'The Fool',
        description: 'The Fool represents new beginnings, adventures, and taking risks.',
        uprightMeaning: 'New beginnings, innocence, spontaneity, a free spirit.',
        reversedMeaning: 'Recklessness, being taken advantage of, inconsideration.',
        image: 'url_to_fool_image.jpg',
    },
    {
        name: 'The Magician',
        description: 'The Magician symbolizes manifesting desires, creativity, and power.',
        uprightMeaning: 'Manifestation, resourcefulness, power, inspired action.',
        reversedMeaning: 'Manipulation, poor planning, untapped talents.',
        image: 'url_to_magician_image.jpg',
    },
    {
        name: 'Two of Cups',
        description: 'The Two of Cups represents partnership, connection, and harmony.',
        uprightMeaning: 'Unified love, partnership, mutual attraction.',
        reversedMeaning: 'Breakup, imbalance in a relationship, lack of harmony.',
        image: 'url_to_two_of_cups_image.jpg',
    },
    // Add more cards as needed
];

// Insert tarot card data into the database
TarotCard.insertMany(tarotCards)
    .then(() => {
        logger.debug('Tarot cards seeded successfully');
        mongoose.connection.close(); // Close the connection after seeding
    })
    .catch((error) => {
        logger.error('Error seeding tarot cards:', error);
        mongoose.connection.close();
    });
