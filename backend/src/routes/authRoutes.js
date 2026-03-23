const express = require("express");
const router = express.Router();
const { loginUser, registerUser, sendOTP } = require("../controllers/authController");

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/send-otp', sendOTP);

module.exports = router;