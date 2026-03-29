
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    // ✅ Read token from httpOnly cookie (not Authorization header)
    const token = req.cookies?.token;

    if (!token)
        return res.status(401).json({ message: "Not authenticated." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach user to request (exclude password)
        req.user = await User.findById(decoded.id).select("-password -otp");
        if (!req.user) return res.status(401).json({ message: "User not found." });
        next();
    } catch (err) {
        // Token expired or tampered
        res.clearCookie("token");
        res.status(401).json({ message: "Session expired. Please login again." });
    }
};

module.exports = { protect };