import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();



// Verify Token Middleware
const verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    try {
      // verify token
      const decoded = jwt.verify(req.token, process.env.JWT_SECRET);
      next();
    } catch (error) {
      return res.json({ message: "Token not verified", error });
    }
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

module.exports = verifyToken;