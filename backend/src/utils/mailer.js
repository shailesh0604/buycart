// src/utils/mailer.js
const nodemailer = require("nodemailer");

// Generate a random 6-digit OTP
const generateOTP = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP email with HTML template
const sendOTPEmail = async (to, otp) => {
    // Debug: log whether env vars are present
    // console.log("EMAIL_USER:", process.env.EMAIL_USER);
    // console.log("EMAIL_PASS set:", !!process.env.EMAIL_PASS);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error("EMAIL_USER or EMAIL_PASS is missing from .env");
    }

    // Create transporter here (not at module load time) so .env is fully loaded
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", port: 465, secure: true, auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"BuyCart" <${process.env.EMAIL_USER}>`,
        to,
        subject: `Your OTP Code: ${otp}`,
        html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;">
        <h2 style="color:#f97316;margin-bottom:8px;">Verify your email</h2>
        <p style="color:#374151;margin-bottom:24px;">Use the code below to verify your email. It expires in <strong>10 minutes</strong>.</p>
        <div style="background:#fff7ed;border:2px dashed #f97316;border-radius:10px;padding:24px;text-align:center;margin-bottom:24px;">
          <p style="margin:0;font-size:11px;color:#9ca3af;letter-spacing:3px;text-transform:uppercase;">Your OTP</p>
          <p style="margin:8px 0 0;font-size:40px;font-weight:800;letter-spacing:12px;color:#ea580c;font-family:monospace;">${otp}</p>
        </div>
        <p style="color:#6b7280;font-size:13px;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
    });
};

module.exports = { generateOTP, sendOTPEmail };