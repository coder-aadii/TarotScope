const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  // Skip auth check for Google auth routes
  if (req.path.includes('/google')) {
    console.log("Skipping auth check for Google route:", req.path);
    return next();
  }

  try {
    // First check if user is already authenticated via session
    if (req.isAuthenticated() && req.user) {
      console.log("User authenticated via session:", req.user._id);
      return next();
    }

    // Check for token in Authorization header
    const authHeader = req.header('Authorization');
    
    // Also check for token in cookies
    const cookieToken = req.cookies?.token;
    
    // If no auth header and no cookie token, return error
    if (!authHeader && !cookieToken) {
      console.log("No Authorization header or cookie token found");
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Use token from header or cookie
    let token;
    if (authHeader) {
      // Extract token from header (supports both "Bearer token" and just "token" formats)
      token = authHeader.startsWith('Bearer ') 
        ? authHeader.substring(7) 
        : authHeader;
    } else {
      // Use token from cookie
      token = cookieToken;
    }

    if (!token) {
      console.log("No valid token found");
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      console.log("User not found for token");
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach the user and token to the request
    req.user = user;
    req.token = token;
    console.log("User authenticated via token:", user._id);
    
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = auth; 