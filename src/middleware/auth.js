const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = require("../config/env");

const protect = async (req, res, next) => {
  try {
    // Get token from header (format: "Bearer eyJhbG...")
    const authHeader = req.headers.authorization;
    // for understanding what req contains 
  //     req = {
  //   method: "GET",
  //   url: "/api/skills",
  //   headers: { authorization: "Bearer eyJhbG..." },
  //   body: { ... },
  //   params: { id: "abc123" }
  // }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ success: false, message: "Not authorized, token invalid" });
    }

    // Find user and attach to request (without password)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "Not authorized, user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { protect };
