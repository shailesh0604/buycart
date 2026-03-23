const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { generateOTP, sendOTPEmail } = require("../utils/mailer")
//generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        return res.status(200).json({
            success: true,
            token: generateToken(user._id),
            user: {
                id: user._id,
                email: user.email,
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

//register user logic
const registerUser = async (req, res) => {
    const { email, password } = req.body;
    // console.log('Body received:', req.body);

    try {

        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({ email, password });

        return res.status(201).json({
            success: true,
            token: generateToken(user._id),
            user: {
                id: user._id,
                email: user.email,
            }
        })
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

//send otp to email logic
// POST /api/auth/send-otp
// Recieving Body: { email }
const sendOTP = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        // check if user email is already exists?
        const existing = await User.findOne({ email });

        // Block if already verified
        if (existing && existing.isVerified) {
            return res.status(409).json({
                message: "Account already exists. Please login.",
                alreadyRegistered: true,
            });
        }

        // check is user is blocked
        if (existing?.otp?.blockedUntil) {
            const now = Date.now();
            const blockedTime = new Date(existing.otp.blockedUntil).getTime();

            if (now < blockedTime) {
                const wait = Math.ceil((blockedTime - now) / 1000);
                return res.status(429).json({ message: `Too many attempts. Try again after ${Math.ceil(wait / 60)} minutes.`, })
            } else {
                // Reset after block expires
                existing.otp.attempts = 0;
                existing.otp.blockedUntil = null;
                await existing.save();
            }
        }

        //  Cooldown check (60sec) user can resend otp after 60sec
        if (existing?.otp?.createdAt) {
            const now = Date.now();
            const lastSent = new Date(existing.otp.createdAt).getTime();
            const diff = now - lastSent;

            if (diff < 60 * 1000) {
                const wait = Math.ceil((60 * 1000 - diff) / 1000);
                return res.status(429).json({
                    message: `Please wait ${wait}s before requesting another OTP.`,
                });
            }
        }

        const attempts = (existing?.otp?.attempts || 0) + 1;

        if (attempts > 5) {
            const blockedUntil = new Date(Date.now() + 2 * 60 * 1000); // 2 min block

            if (existing) {
                existing.otp.blockedUntil = blockedUntil;
                await existing.save();
            }

            return res.status(429).json({
                message: "Too many attempts. Blocked for 2 minutes.",
            });
        }

        // Generate OTP
        const otp = generateOTP();

        const otpData = {
            code: otp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
            createdAt: new Date(),
            attempts,
            verified: false,
            blockedUntil: null,
        };

        if (existing) {
            existing.otp = otpData;
            // if email is already exist & within max attempt limit it will update the otp on same email 
            await existing.save();
        } else {
            // if email is not exist its create new user with following fields 
            await User.create({
                email,
                otp: otpData,
                isVerified: false,
            });
        }

        await sendOTPEmail(email, otp);

        return res.status(200).json({
            message: `OTP sent to ${email}. Valid for 10 minutes.`,
        });

    } catch (error) {
        console.error("sendOtp error:", error);
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

module.exports = { loginUser, registerUser, sendOTP }