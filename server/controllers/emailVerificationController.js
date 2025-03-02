const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');  // Ensure nodemailer is imported

// Email verification controller
exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;  // Extract the token from the query string

        if (!token) {
            return res.status(400).json({ message: 'Invalid or missing token' });
        }

        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'User is already verified' });
        }

        // Mark user as verified
        user.isVerified = true;
        await user.save();

        return res.status(200).json({ message: 'Email successfully verified' });
    } catch (error) {
        console.error('Error in verifyEmail:', error);

        // Differentiate between JWT-specific errors
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ message: 'Token has expired' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({ message: 'Invalid token' });
        } else {
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }
};

const sendVerificationEmail = (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,  // This can help prevent issues with self-signed certificates.
        },
    });

    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
    const mailOptions = {
        from: `"TarotScope Team" <${process.env.EMAIL_USER}>`,  // Adding sender name
        to: email,
        subject: 'Verify your email with TarotScope!',
        html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);">
              
              <!-- Logo -->
              <div style="text-align: center;">
                  <img src="https://res.cloudinary.com/deoegf9on/image/upload/v1740217290/logo-img_ocgldv.png" alt="TarotScope Logo" style="width: 150px; margin-bottom: 20px;" />
              </div>
              
              <!-- Heading -->
              <h2 style="text-align: center; color: #333;">Welcome to TarotScope!</h2>
              <p style="text-align: center; font-size: 16px; color: #555;">Your journey into the world of Tarot readings starts here.</p>
  
              <!-- GIF/Animation -->
              <div style="text-align: center; margin-bottom: 20px;">
                  <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTJ1MXE1bHJsMXVzbnptbXVpaWxudWRnMDFueW5iMzczNjVpd3RqdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SrWh9peE9r1MTVr8aQ/giphy.gif" alt="Tarot Reading Animation" style="width: 100%; max-width: 400px;" />
              </div>
  
              <!-- Verification Message -->
              <p style="font-size: 16px; color: #555;">To complete your registration and start exploring your readings, please verify your email by clicking the link below:</p>
  
              <!-- Verification Button -->
              <div style="text-align: center; margin: 30px 0;">
                  <a href="${verificationUrl}" style="background-color: #ff6f61; color: white; padding: 10px 20px; text-decoration: none; font-size: 18px; border-radius: 5px;">Verify Email</a>
              </div>
  
              <!-- Video Thumbnail (Clickable) -->
              <div style="text-align: center; margin-top: 20px;">
                  <a href="https://www.youtube.com/embed/fFUD1N8z2Hk?si=qSV_97lhOWwzowBv" target="_blank">
                      <img src="https://res.cloudinary.com/deoegf9on/image/upload/v1740217291/logo_g2ybxs.png" alt="Watch Video" style="width: 100%; max-width: 400px; border-radius: 10px;" />
                  </a>
                  <p style="font-size: 14px; color: #777;">Click the image above to watch a quick video about how TarotScope works.</p>
              </div>
  
              <!-- Footer -->
              <div style="text-align: center; margin-top: 40px;">
                  <p style="font-size: 14px; color: #999;">If you didn’t sign up for TarotScope, you can safely ignore this email.</p>
                  <p style="font-size: 14px; color: #999;">&copy; 2025 TarotScope | All Rights Reserved</p>
              </div>
          </div>
      </div>
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error("Error sending email:", err);  // Use console.error for error logging
        } else {
            console.log('Verification email sent:', info.response);
        }
    });
};
