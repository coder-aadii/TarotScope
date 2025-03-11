const User = require('../models/User');

// Get user profile by ID
exports.getUserProfile = async (req, res) => {
    try {
        // Log the request user data
        console.log("User data:", req.user);

        // Check if user is authenticated (should be guaranteed by auth middleware)
        if (!req.user) {
            console.log("Unauthorized: No user data");
            return res.status(401).json({ message: 'Unauthorized: No user data' });
        }

        // Use the user ID from the authenticated user
        const userId = req.user._id || req.user.id;

        console.log("Fetching user with ID:", userId);

        // If we're already using the full user object from auth middleware, we can just return it
        if (req.user.name && req.user.email) {
            console.log("Using existing user data");
            return res.status(200).json(req.user);
        }

        // Otherwise, fetch the full user data
        const user = await User.findById(userId);

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: 'User not found' });
        }

        console.log("User profile fetched successfully");
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: 'Failed to fetch user profile' });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        // Log the request body and user data
        console.log("Request body:", req.body);
        console.log("User data:", req.user);

        // Check if user is authenticated (should be guaranteed by auth middleware)
        if (!req.user) {
            console.log("Unauthorized: No user data");
            return res.status(401).json({ message: 'Unauthorized: No user data' });
        }

        // Use the user ID from the authenticated user or from params
        const userId = req.params.id || req.user._id || req.user.id;

        console.log("Updating user with ID:", userId);

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
            console.log("Profile image uploaded:", req.file.path);
            updatedData.profileImageUrl = req.file.path;
        }

        // Update the user in the database
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        console.log("User profile updated successfully");
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
};
