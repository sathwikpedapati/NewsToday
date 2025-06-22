const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Protect Route Error:", err.message);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = { protectRoute };
