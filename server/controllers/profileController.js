const User = require('../models/User');

// Get user profile by ID
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user profile' });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;

        const updatedData = {
            name: req.body.name,
            city: req.body.city,
            bio: req.body.bio,
            'readingPreferences.preferredSpread': req.body.preferredSpread,
            'readingPreferences.preferredQuestionType': req.body.preferredQuestionType,
            'socialMediaHandles.twitter': req.body.twitter,
            'socialMediaHandles.instagram': req.body.instagram,
        };

        // If a new profile image is uploaded, add it to the update
        if (req.file) {
            updatedData.profileImageUrl = req.file.path;
        }

        // Update the user in the database
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
};
