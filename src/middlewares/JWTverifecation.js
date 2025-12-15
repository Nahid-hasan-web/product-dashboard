const jwt = require("jsonwebtoken");

const jwtVerification = (req, res, next) => {
  try {
    const token = req.headers.authorization;
      console.log(token)
    if(!token) return  res.status(404).send('access token not found')

    const decoded = jwt.verify(token, process.env.jwt_secret);

    req.user = decoded

    next();
 
  } catch (err) {
    console.error('Middleware error:', err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = jwtVerification;