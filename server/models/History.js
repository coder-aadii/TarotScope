// Reading history schema

const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true,
    },
    selectedCards: [
        {
            id: Number,
            name: String,
            meaning: Object,
            isReversed: Boolean,
            image: String
        }
    ],
    question: {
        type: String,
        required: false, // Optional if there's no question
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const History = mongoose.model('History', historySchema);
module.exports = History;
