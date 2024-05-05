const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const authenticateToken = (req, res, next) => {
    console.log('Checking for token in headers...');
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      console.log('Token not provided');
      return res.status(401).json({ error: 'Token not provided' });
    }
  
    console.log('Verifying token...');
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log('Invalid or expired token');
        return res.status(403).json({ error: 'Invalid or expired token' });
      }
  
      console.log('Token verified, attaching user to request...');
      req.user = user; // Attach user information to the request
      next();
    });
  };
  module.exports = authenticateToken;
