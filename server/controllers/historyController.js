const History = require('../models/History');
const mongoose = require('mongoose');

// Get history by userId
const getHistoryByUserId = async (req, res) => {
    try {
        const { userId } = req.params; // Get userId from request parameters
        const userHistory = await History.find({ userId: mongoose.Types.ObjectId(userId) }); // Find history entries by userId
        res.status(200).json(userHistory); // Send the history as response
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch history' });
    }
};

// Save reading history
const saveReadingHistory = async (req, res) => {
    const { selectedCards, question } = req.body;

    // Assuming req.user is populated by authentication middleware (JWT decoding, etc.)
    const userId = req.user && req.user._id;

    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    try {
        const newHistory = new History({
            userId: mongoose.Types.ObjectId(userId),
            selectedCards,
            question,
            date: new Date(),
        });

        await newHistory.save(); // Save new history to the database
        res.status(201).json({ message: 'Reading history saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save reading history' });
    }
};

module.exports = {
    getHistoryByUserId,
    saveReadingHistory,
};
