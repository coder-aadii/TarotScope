// Reading history schema

const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tarotCardIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TarotCard' }],
  question: { type: String },
  result: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', HistorySchema);
