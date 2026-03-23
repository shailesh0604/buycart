const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            minlength: 6,
            required: function () {
                return this.isVerified; // only required after OTP verification
            },
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        otp: {
            code: String,
            expiresAt: Date,
            createdAt: Date,
            attempts: {
                type: Number,
                default: 0,
            },
            verified: {
                type: Boolean,
                default: false,
            },
        },
    },
    { timestamps: true }
);


// Hash password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password") || !this.password) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model("User", userSchema);