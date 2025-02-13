// Tarot card schema (name, image, meaning)

const mongoose = require('mongoose');

const TarotCardSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    arcana: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String, // Assuming you'll store the URL of the image as a string
        required: true
    },
    meanings: {
        upright: {
            general: { type: String, required: true },
            love: { type: String, required: true },
            career: { type: String, required: true },
            finance: { type: String, required: true }
        },
        reversed: {
            general: { type: String, required: true },
            love: { type: String, required: true },
            career: { type: String, required: true },
            finance: { type: String, required: true }
        }
    }
});

const TarotCard = mongoose.model('TarotCard', TarotCardSchema);

module.exports = TarotCard;
