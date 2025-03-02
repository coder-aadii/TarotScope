const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Removed fs and path logic for logo
const logoURL = 'https://res.cloudinary.com/deoegf9on/image/upload/v1740217290/logo-img_ocgldv.png';

// Create transporter for sending email
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email provider (Gmail, Outlook, etc.)
  auth: {
    user: process.env.EMAIL_USER, // Your email address (e.g., TarotScope's email)
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

const sendWelcomeEmail = (email, name) => {
  const mailOptions = {
    from: `"TarotScope" <${process.env.EMAIL_USER}>`, // Sender address
    to: email, // Recipient's email address
    subject: 'Welcome to TarotScope!',
    html: `
        <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                <!-- Logo Image -->
                <div style="text-align: center;">
                    <img src="${logoURL}" alt="TarotScope Logo" style="max-width: 450px;"/>
                </div>

                <h1 style="color: #4800ff; text-align: center;">Welcome to TarotScope, ${name}!</h1>
                <p style="font-size: 16px; text-align: center; color: #333;">We're thrilled to have you join our community. TarotScope is your personal guide to the world of tarot reading, offering deep insights and answers to your most pressing questions.</p>
                
                <!-- Interactive Description Section -->
                <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-radius: 10px; border: 1px solid #ddd;">
                    <h2 style="color: #333; text-align: center;">What Can You Do on TarotScope?</h2>
                    <ul style="list-style-type: none; padding: 0; text-align: center; font-size: 16px;">
                        <li style="margin-bottom: 10px;">🔮 Get personalized tarot readings</li>
                        <li style="margin-bottom: 10px;">📜 Explore your past readings in the history section</li>
                        <li style="margin-bottom: 10px;">💫 Understand tarot card meanings with our Tarot Guide</li>
                        <li style="margin-bottom: 10px;">🌟 Save your favorite cards and readings</li>
                    </ul>
                </div>

                <!-- Animation GIF -->
                <div style="text-align: center; margin: 20px 0;">
                    <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3AzOGd6dGN4dThvZjNnbDQ2d3I3MWxkOWVxaWQza3hmaGZzeWVqNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SrWh9peE9r1MTVr8aQ/giphy.gif" alt="Welcome Animation" style="max-width: 100%; border-radius: 10px;"/>
                </div>

                <!-- CTA Button -->
                <p style="font-size: 16px; text-align: center;">Start your journey today by <a href="https://tarotscope.netlify.app/login" style="color: #4800ff; text-decoration: none; font-weight: bold;">logging into TarotScope</a> and asking your first question!</p>
                
                <p style="font-size: 16px; text-align: center;">May the cards be ever in your favor!</p>
                <p style="font-size: 14px; text-align: center; color: #555;">Best regards,<br/>The TarotScope Team</p>

                <!-- Contact Section with Interactive Button -->
                <div style="margin-top: 20px; padding: 15px; background-color: #f0f0f0; border-radius: 8px; text-align: center; border: 1px solid #ddd;">
                    <h3 style="margin: 0 0 10px 0; color: #333;">Need Help?</h3>
                    <p style="margin: 0; font-size: 14px; color: #555;">Feel free to reach out to us!</p>
                    <a href="mailto:support@tarotscope.com" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background-color: #4800ff; color: #fff; border-radius: 5px; text-decoration: none; font-size: 16px;">
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
        `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};


// Registration Logic
const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verified: true,  // User is directly marked as verified
    });

    await user.save();

    sendWelcomeEmail(email, name); // Send the HTML welcome email

    res.status(201).json({ message: "Registration successful. Please log in." });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Error registering user.", error });
  }
};

// Login Logic
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password); // Compare passwords
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate JWT token

    // Update last login date
    user.lastLogin = new Date();
    await user.save();

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Error logging in." });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, city, bio } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's profile fields
    user.name = name || user.name;
    user.city = city || user.city;
    user.bio = bio || user.bio;

    // If a new profile image is uploaded, update the profileImageUrl field
    if (req.file) {
      user.profileImageUrl = `/uploads/${req.file.filename}`; // Path to the uploaded file
    }

    await user.save(); // Save the updated user data

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile", error });
  }
};

module.exports = { registerUser, loginUser, updateUserProfile };
