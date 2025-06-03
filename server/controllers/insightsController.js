const mongoose = require('mongoose'); // Import mongoose for ObjectId conversion
const History = require('../models/History'); // Import the History model
const logger = require('../utils/logger');

// Function to get reading statistics for a specific user
const getReadingStats = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Convert userId to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId); // Use 'new' keyword here

        // Example: Calculate reading frequency over the last 4 weeks for the specific user
        const readingFrequency = await History.aggregate([
            { $match: { userId: userObjectId } }, // Match only the user's history
            {
                $group: {
                    _id: { $week: "$date" },
                    readings: { $sum: 1 }
                }
            },
            {
                $project: {
                    week: "$_id",
                    readings: 1,
                    _id: 0
                }
            }
        ]);

        // Example: Find common themes for this user
        const themesData = await History.aggregate([
            { $match: { userId: userObjectId } }, // Match only the user's history
            { $unwind: "$theme" },
            { $group: { _id: "$theme", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 3 }
        ]);
        const commonThemes = themesData.map(theme => theme._id); // Extract themes

        // Example: Find favorite cards for this user
        const favoriteCardsData = await History.aggregate([
            { $match: { userId: userObjectId } }, // Match only the user's history
            { $unwind: "$selectedCards" }, // Unwind selected cards
            {
                $group: {
                    _id: "$selectedCards.name", // Group by card name
                    count: { $sum: 1 }, // Count occurrences
                    image: { $first: "$selectedCards.image" } // Get the image of the card
                }
            },
            { $sort: { count: -1 } }, // Sort by most frequent
            { $limit: 3 } // Limit to top 3 favorite cards
        ]);
        const favoriteCards = favoriteCardsData.map(card => ({
            name: card._id,
            image: card.image // Use the image stored in MongoDB
        }));

        res.status(200).json({
            readingFrequency,
            commonThemes,
            favoriteCards
        });
    } catch (error) {
        logger.error('Error fetching reading stats:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Function to get card appearance frequency for a specific user
const getCardFrequency = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Convert userId to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId); // Use 'new' keyword here

        // Example: Count frequency of each card appearing in the user's history
        const cardsData = await History.aggregate([
            { $match: { userId: userObjectId } }, // Match only the user's history
            { $unwind: "$selectedCards" },
            { $group: { _id: "$selectedCards", frequency: { $sum: 1 } } },
            { $sort: { frequency: -1 } }
        ]);
        const cards = cardsData.map(card => ({
            name: card._id,
            frequency: card.frequency
        }));

        // Example: Count Upright vs Reversed cards for the user
        const uprightVsReversedData = await History.aggregate([
            { $match: { userId: userObjectId } }, // Match only the user's history
            { $unwind: "$selectedCards" },
            {
                $group: {
                    _id: "$selectedCards.orientation", // Assuming 'orientation' field has "Upright" or "Reversed"
                    value: { $sum: 1 }
                }
            }
        ]);
        const uprightVsReversed = uprightVsReversedData.map(item => ({
            name: item._id,
            value: item.value
        }));

        res.status(200).json({
            cards,
            uprightVsReversed
        });
    } catch (error) {
        logger.error('Error fetching card frequency:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getReadingStats, getCardFrequency };
