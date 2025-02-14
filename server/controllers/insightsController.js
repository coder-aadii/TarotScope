// server/controllers/insightsController.js

// Function to get reading statistics
const getReadingStats = (req, res) => {
    try {
        // Dummy data for now, replace this with actual database queries later
        const readingStats = {
            readingFrequency: [
                { week: 'Week 1', readings: 5 },
                { week: 'Week 2', readings: 3 },
                { week: 'Week 3', readings: 8 },
                { week: 'Week 4', readings: 6 },
            ],
            commonThemes: ['Love', 'Career', 'Health'],
            favoriteCards: [
                { name: 'The Fool', image: '/path/to/fool.jpg' },
                { name: 'The Magician', image: '/path/to/magician.jpg' },
            ]
        };
        res.status(200).json(readingStats);
    } catch (error) {
        console.error('Error fetching reading stats:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Function to get card appearance frequency
const getCardFrequency = (req, res) => {
    try {
        // Dummy data for now, replace this with actual database queries later
        const cardFrequency = {
            cards: [
                { name: 'The Fool', frequency: 10 },
                { name: 'The Magician', frequency: 8 },
                { name: 'The High Priestess', frequency: 6 },
            ],
            uprightVsReversed: [
                { value: 15, name: 'Upright' },
                { value: 5, name: 'Reversed' },
            ]
        };
        res.status(200).json(cardFrequency);
    } catch (error) {
        console.error('Error fetching card frequency:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getReadingStats, getCardFrequency };
