const User = require("../models/User");
const jwt = require("jsonwebtoken");

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
    console.log('Body received:', req.body);

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

module.exports = { loginUser, registerUser }