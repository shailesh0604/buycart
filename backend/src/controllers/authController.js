const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { generateOTP, sendOTPEmail } = require("../utils/mailer")

//cookies config
const COOKIE_OPTIONS = {
    httpOnly: true,   // ← JS can NEVER read this cookie (blocks XSS token theft)
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    sameSite: "strict", // ← blocks CSRF — cookie only sent from same origin
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
};


//generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password)
            return res.status(400).json({ message: "Email and password required." });

        const user = await User.findOne({ email });
        if (!user || !user.isVerified)
            return res.status(401).json({ message: "Invalid credentials." });

        if (!(await user.matchPassword(password)))
            return res.status(401).json({ message: "Invalid credentials." });

        const token = generateToken(user._id);

        //  JWT goes in httpOnly cookie
        res.cookie("token", token, COOKIE_OPTIONS);

        res.status(200).json({
            message: "Login successful!",
            user: { id: user._id, email: user.email, name: user.name },
        });
    } catch (err) {
        console.error("loginUser:", err);
        res.status(500).json({ message: "Server error.", error: err.message });
    }
};

// POST /api/auth/logout
// Clears the cookie
const logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    return res.status(200).json({ message: "Logged out successfully." });
};


// GET /api/auth/me  (protected — verify token from cookie)
// Frontend calls this on load to restore session
const getMe = async (req, res) => {
    // req.user is set by the protect middleware
    return res.status(200).json({ user: req.user });
};

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

    console.log('sendOTP request body:', req.body);
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


const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found. Please start again." });
        }

        // Increment attempt counter first
        user.otp.attempts = (user.otp.attempts || 0) + 1;
        await user.save();

        // Check expiry
        if (!user.otp.expiresAt || new Date() > user.otp.expiresAt) {
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }

        // Check attempt limit
        if (user.otp.attempts > 5) {
            return res.status(429).json({
                message: "Too many failed attempts. Please request a new OTP.",
            });
        }

        // Check OTP match
        if (user.otp.code !== otp) {
            const remaining = 5 - user.otp.attempts;
            return res.status(400).json({
                message: `Incorrect OTP. ${remaining} attempt${remaining !== 1 ? "s" : ""} remaining.`,
            });
        }

        // ✅ OTP correct — mark verified flag, clear code
        user.otp.verified = true;
        user.otp.code = null;
        await user.save();

        return res.status(200).json({
            message: "OTP verified! Please set your password.",
        });
    } catch (error) {
        console.error("verifyOtp error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const completeRegister = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Session expired. Please start again." });
        }

        // Guard: OTP must have been verified in step 2
        if (!user.otp?.verified) {
            return res.status(403).json({
                message: "Email not verified. Please complete the OTP step first.",
            });
        }

        // Set real password (pre-save hook will hash it automatically)
        user.password = password;
        user.isVerified = true;
        user.otp = { code: null, expiresAt: null, attempts: 0, verified: false }; // clear OTP
        await user.save();

        const token = generateToken(user._id);

        // ✅ Set JWT in httpOnly cookie — JS cannot read this
        res.cookie("token", token, COOKIE_OPTIONS);

        return res.status(201).json({
            success: true,
            message: "Account created successfully!",
            user: { id: user._id, email: user.email, name: user.name },
        });
    } catch (error) {
        console.error("completeRegister error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



module.exports = { loginUser, logoutUser, registerUser, sendOTP, verifyOTP, completeRegister, getMe };