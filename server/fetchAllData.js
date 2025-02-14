const mongoose = require('mongoose');

// Replace this with your actual MongoDB URI
const MONGO_URI = 'mongodb+srv://adityaaerpule191996:Asdf1234@fog-cluster.x015l.mongodb.net/TarotScope?retryWrites=true&w=majority';

// Define a schema for the tarot card collection
const tarotCardSchema = new mongoose.Schema({
    id: Number,
    name: String,
    arcana: String,
    description: String,
    image: String,
    meanings: {
        upright: {
            general: String,
            love: String,
            career: String,
            finance: String
        },
        reversed: {
            general: String,
            love: String,
            career: String,
            finance: String
        }
    }
});

// Create a model for the tarot card collection (explicitly define collection name)
const TarotCard = mongoose.model('TarotCard', tarotCardSchema, 'TarotCard');

// Function to fetch all data
const fetchAllData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        // Fetch all tarot cards
        const tarotCards = await TarotCard.find();
        console.log('Fetched Tarot Cards:', tarotCards);

        // Close the connection after fetching data
        mongoose.connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        mongoose.connection.close();
    }
};

// Execute the function to fetch data
fetchAllData();
