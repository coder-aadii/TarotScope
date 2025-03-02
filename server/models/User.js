const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Full Name field
  email: { type: String, required: true, unique: true }, // Email remains required and unique
  password: { type: String, required: true },
  profileImageUrl: { type: String, default: "" },
  city: { type: String, default: "" },
  bio: { type: String, default: "" },
  pastReadings: [
    {
      readingDate: { type: Date, default: Date.now },
      selectedCards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TarotCard' }],
      questionAsked: { type: String },
      interpretation: { type: String }
    }
  ],
  favoriteCards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TarotCard' }],
  lastLogin: { type: Date },  // To track the last login date
  role: { type: String, default: 'user' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },

  // Additional fields
  bookmarks: [
    {
      card: { type: mongoose.Schema.Types.ObjectId, ref: 'TarotCard' },
      note: { type: String },
    }
  ],
  readingPreferences: {
    preferredSpread: { type: String },
    preferredQuestionType: { type: String },
  },
  notifications: [
    {
      message: { type: String },
      isRead: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  accountStatus: { type: String, default: 'active' }, // Active by default
  socialMediaHandles: {
    twitter: { type: String },
    instagram: { type: String },
  },
  tarotReadingCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', UserSchema);
