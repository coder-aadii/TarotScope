const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImageUrl: { type: String, default: "" },  // For profile image (URL to the image file)
  city: { type: String, default: "" },  // Optional field for city or location
  bio: { type: String, default: "" },  // Optional user bio or description
  pastReadings: [
    {
      readingDate: { type: Date, default: Date.now }, 
      selectedCards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TarotCard' }], 
      questionAsked: { type: String },  
      interpretation: { type: String }  
    }
  ],
  favoriteCards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TarotCard' }],  
  lastLogin: { type: Date },  
  role: { type: String, default: 'user' },  
  isActive: { type: Boolean, default: true },  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
