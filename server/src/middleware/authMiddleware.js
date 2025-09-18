const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require("../models/User");
const TokenBlacklist = require("../models/TokenBlacklist");

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Check if token is blacklisted or not
      const blacklisted = await TokenBlacklist.findOne({ token });
      if (blacklisted) {
        res.status(401);
        throw new Error("Not authorized, token is blacklisted");
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token (Exclude password)
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }