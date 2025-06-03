const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

// POST route for sending email
router.post('/send', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    try {
        // Create transporter object using your email service and credentials
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Or another email service
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // Your password
            },
        });

        // Send the email with HTML and inline CSS
        await transporter.sendMail({
            from: email,
            to: process.env.CONTACT_EMAIL,
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
                    <h2 style="text-align: center; color: #4a90e2;">New Contact Form Submission</h2>
                    <p style="font-size: 16px; color: #555;">
                        <strong style="color: #333;">Name:</strong> ${name}<br />
                        <strong style="color: #333;">Email:</strong> ${email}<br />
                        <strong style="color: #333;">Message:</strong>
                    </p>
                    <p style="background-color: #fff; border-left: 4px solid #4a90e2; padding: 10px; font-size: 14px; color: #555;">
                        ${message}
                    </p>
                    <p style="text-align: center; font-size: 14px; color: #777; margin-top: 20px;">
                        Sent via TarotScope Contact Form
                    </p>
                </div>
            `,
        });

        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        logger.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
});

// Export the router
module.exports = router;
