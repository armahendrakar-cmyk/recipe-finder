// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

/**
 * Middleware to protect routes. It acts as a gatekeeper.
 * 1. Checks for a JWT in the Authorization header.
 * 2. Verifies the token's authenticity and expiration.
 * 3. Fetches the user from the database using the token's ID.
 * 4. Attaches the user object (without the password) to the request object.
 * 5. Passes control to the next middleware or the actual route handler.
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // The standard for sending tokens is in the Authorization header with the "Bearer" scheme.
  // We first check if this header exists and is formatted correctly.
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // The header looks like: "Bearer <tokenstring>". We split the string by the space
      // and take the second part, which is the token itself.
      token = req.headers.authorization.split(' ')[1];

      // This is the most critical step. jwt.verify() will do two things:
      // 1. Check if the token's signature is valid using our JWT_SECRET.
      // 2. Check if the token has expired.
      // If either check fails, it will throw an error, which will be caught by our `catch` block.
      // If it succeeds, it returns the decoded payload (the data we stored in it, like the user's ID).
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // If the token is verified, we use the ID from the decoded payload to find
      // the user in our database. We then attach this user information to the request object.
      // `.select('-password')` is a crucial security measure. It ensures that even though we fetch
      // the user document, we explicitly exclude the hashed password field from the result.
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
          res.status(401);
          throw new Error("User not found");
      }

      // If a user is found, we call `next()` to move on to the next piece of middleware
      // or the actual route handler that this middleware is protecting.
      next();

    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401); // 401 Unauthorized
      throw new Error('Not authorized, token failed');
    }
  }

  // If the `if` block above was never entered, it means no token was sent at all.
  if (!token) {
    res.status(401); // 401 Unauthorized
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };