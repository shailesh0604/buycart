const express = require("express");
const router = express.Router();
const { loginUser, registerUser, sendOTP, verifyOTP, completeRegister, getMe, logoutUser } = require("../controllers/authController");
const protect = require("../middleware/protect");

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/send-otp', sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/logout", logoutUser);
router.post("/complete-register", completeRegister);

// Session restore — frontend calls this on app load
router.get("/me", protect, getMe);         // returns user if cookie valid
module.exports = router;