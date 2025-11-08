const jwt = require("jsonwebtoken");

const jwtVerification = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    console.log('Auth Header:', authHeader); // Debug log
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No valid auth header'); // Debug log
      return res.status(401).json({ 
        message: "Access token not found"
      });
    }

    const token = authHeader.split(' ')[1];
    console.log('Extracted token:', token); // Debug log

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log('JWT verification failed:', err.message); // Debug log
        return res.status(401).json({ 
          message: "Token expired or invalid",
          error: err.message
        });
      }
      
      req.user = decoded;
      next();
    });
  } catch (err) {
    console.error('Middleware error:', err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = jwtVerification;