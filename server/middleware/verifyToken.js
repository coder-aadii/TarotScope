const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');

  // Check if the token is present in the Authorization header
  if (!authHeader) {
    return res.status(403).json({ error: 'Access denied, no token provided' });
  }

  const token = authHeader.split(' ')[1]; // Get the token from the 'Bearer <token>' format

  if (!token) {
    return res.status(403).json({ error: 'Access denied, invalid token format' });
  }

  try {
    // Verify the token and extract the payload
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    console.log('Token verification is successful!');

    // Attach the verified user (payload) to the request object
    req.user = verified;

    // Call next middleware or route handler
    next();
  } catch (error) {
    // Catch and handle invalid token or verification errors
    console.error('Token verification failed:', error.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = verifyToken;
