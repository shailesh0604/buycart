"use client";
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from 'next/link';
import axios from 'axios';
import { signIn } from "next-auth/react";

const API = process.env.API_BASE_URL || 'http://localhost:4000/api';

axios.defaults.withCredentials = true;

const STEP = {
    EMAIL: 'email',
    OTP: 'otp',
    PASSWORD: 'password',
    DONE: 'done',
};


const Login = () => {
    // defining first step
    const [step, setStep] = useState(STEP.EMAIL);
    const [email, setEmail] = useState("");
    const [digits, setDigits] = useState(['', '', '', '', '', '']);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [cooldown, setCooldown] = useState(0);
    const inputsRef = useRef([]);
    const timerRef = useRef(null);

    // Cooldown countdown
    useEffect(() => {
        if (cooldown <= 0) return;
        timerRef.current = setInterval(() => {
            setCooldown((c) => {
                if (c <= 1) { clearInterval(timerRef.current); return 0; }
                return c - 1;
            });
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, [cooldown]);

    const showMsg = (type, text) => setMessage({ type, text });
    const clearMsg = () => setMessage(null);


    const inputCls = "block w-full rounded-md bg-white/5 px-3 py-2.5 text-base text-black outline-1 -outline-offset-1 outline-black/20 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 sm:text-sm/6";
    // step 1 : email input and request otp
    const handleSendOtp = async (e) => {
        e.preventDefault();
        clearMsg();
        setLoading(true);
        try {
            const { data } = await axios.post(`${API}/auth/send-otp`, { email });
            showMsg('success', data.message);
            setStep(STEP.OTP);
            setTimeout(() => inputsRef.current[0]?.focus(), 100);
            setCooldown(60); // 60 seconds cooldown
        } catch (err) {
            showMsg('error', err.response?.data?.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    }

    // step 2 : otp input and verify otp
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        const otp = digits.join('');
        if (otp.length !== 6) return showMsg('error', 'Please enter the complete 6-digit OTP.');
        clearMsg();
        setLoading(true);
        try {
            const { data } = await axios.post(`${API}/auth/verify-otp`, { email, otp });
            showMsg('success', data.message);
            setStep(STEP.PASSWORD);
        } catch (err) {
            showMsg('error', err.response?.data?.message || 'Invalid or expired OTP.');
            setDigits(['', '', '', '', '', '']);
            setTimeout(() => inputsRef.current[0]?.focus(), 100);
        } finally {
            setLoading(false);
        }
    };


    // ── STEP 3: User clicks "Create Account" ────────────────────────────────
    const handleCompleteRegister = async (e) => {
        e.preventDefault();
        if (password.length < 6) return showMsg('error', 'Password must be at least 6 characters.');
        if (password !== confirmPassword) return showMsg('error', 'Passwords do not match.');
        clearMsg();
        setLoading(true);
        try {
            const { data } = await axios.post(`${API}/auth/complete-register`, { email, password });
            showMsg('success', data.message);
            if (data.token) localStorage.setItem('token', data.token);
            setStep(STEP.DONE);
        } catch (err) {
            showMsg('error', err.response?.data?.message || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    // ── Resend OTP ───────────────────────────────────────────────────────────
    const handleResend = async (e) => {
        e.preventDefault();
        if (cooldown > 0) return;
        clearMsg();
        setLoading(true);
        try {
            const { data } = await axios.post(`${API}/auth/send-otp`, { email });
            showMsg('success', data.message);
            setDigits(['', '', '', '', '', '']);
            setCooldown(60);
            setTimeout(() => inputsRef.current[0]?.focus(), 100);
        } catch (err) {
            showMsg('error', err.response?.data?.message || 'Failed to resend OTP.');
        } finally {
            setLoading(false);
        }
    };

    // ── OTP digit input handlers ─────────────────────────────────────────────
    const handleDigit = (i, val) => {
        if (!/^\d?$/.test(val)) return;// numbers only
        const next = [...digits];
        next[i] = val;
        setDigits(next);
        if (val && i < 5) inputsRef.current[i + 1]?.focus(); // jump forward
    };

    const handleDigitKeyDown = (i, e) => {
        if (e.key === 'Backspace' && !digits[i] && i > 0) {
            inputsRef.current[i - 1]?.focus(); // jump back on backspace
        }
    };

    const handlePaste = (e) => {
        // Allow pasting full 6-digit OTP at once
        const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (text.length === 6) {
            setDigits(text.split(''));
            inputsRef.current[5]?.focus();
        }
    };

    return (
        <>
            <section className='section-login'>

                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <Image
                            alt="buycart logo " width={0} height={0}
                            src="/assets/images/logo/logo.png" sizes='100%'
                            className="mx-auto h-10 w-auto"
                        />
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">
                            {step === STEP.EMAIL && 'Sign in to your account'}
                            {step === STEP.OTP && 'Verify your email'}
                            {step === STEP.PASSWORD && 'Set your password'}
                            {step === STEP.DONE && 'Login Successful'}
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                        {/* SUCCESS / ERROR message on p tag  */}
                        {message && (
                            <p className={`text-sm font-medium px-4 py-3 rounded-md border ${message.type === 'success'
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : 'bg-red-50 text-red-700 border-red-200'
                                }`}>
                                {message.type === 'success' ? '✅ ' : '❌ '}
                                {message.text}
                            </p>
                        )}

                        {/* step 1 : email input form */}
                        {step === STEP.EMAIL && (
                            <form onSubmit={handleSendOtp} method="POST" className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm/6 font-medium text-black">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            inputMode='email'
                                            placeholder='Enter email address'
                                            autoComplete="email"
                                            className="block w-full rounded-md bg-white/5 px-3 py-2.5 text-base text-black outline-1 -outline-offset-1 outline-black/20 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={loading || cooldown > 0}
                                        className="flex w-full justify-center cursor-pointer rounded-md bg-orange-500 px-3 py-3 text-sm/6 font-semibold text-white hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                                    >
                                        {loading ? (<>
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Sending OTP...
                                        </>) : "Sign In"}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* step 2 : otp input form */}
                        {step === STEP.OTP &&
                            (<form onSubmit={handleVerifyOtp} className="space-y-5">
                                <p className="text-sm text-gray-500 text-center my-5">
                                    We sent a 6-digit code to{' '}
                                    <span className="font-semibold text-orange-500">{email}</span>
                                </p>

                                {/* 6 individual digit boxes */}
                                <div className="grid gap-2 md:gap-3 grid-cols-6" onPaste={handlePaste}>
                                    {digits.map((d, i) => (
                                        <input
                                            key={i}
                                            ref={(el) => (inputsRef.current[i] = el)}
                                            type="text"
                                            inputMode="numeric"
                                            name='otp'
                                            id={`otp-${i}`}
                                            maxLength={1}
                                            value={d}
                                            onChange={(e) => handleDigit(i, e.target.value)}
                                            onKeyDown={(e) => handleDigitKeyDown(i, e)}
                                            className="w-full text-center text-xl font-bold rounded-md bg-white/5 outline-1 -outline-offset-1 outline-black/20 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 text-black py-2.5 transition-all"
                                            style={{ height: '3.2rem' }}
                                        />
                                    ))}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || digits.join('').length !== 6}
                                    className="flex w-full justify-center items-center gap-2 cursor-pointer rounded-md bg-orange-500 px-3 py-3 text-sm/6 font-semibold text-white hover:bg-orange-400 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Verifying...
                                        </>
                                    ) : 'Verify OTP ✓'}
                                </button>

                                <div className="flex items-center justify-between text-sm">
                                    <button
                                        type="button"
                                        onClick={() => { setStep(STEP.EMAIL); clearMsg(); }}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        ← Change email
                                    </button>
                                    <span>
                                        {cooldown > 0 ? (
                                            <span className="text-gray-500">
                                                Resend in{' '}
                                                <span className="font-semibold text-orange-500">{cooldown}s</span>
                                            </span>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={handleResend}
                                                disabled={loading}
                                                className="text-orange-500 font-semibold hover:text-orange-400 transition-colors"
                                            >
                                                Resend OTP
                                            </button>
                                        )}
                                    </span>
                                </div>
                            </form>
                            )}

                        {/* step 3 : password input form */}
                        {step === STEP.PASSWORD && (
                            <form onSubmit={handleCompleteRegister} className="space-y-5">
                                <p className="text-sm text-gray-500 text-center">
                                    ✅ Email verified — now set a password
                                </p>

                                <div>
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-black">
                                        Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            type="password"
                                            required
                                            minLength={6}
                                            placeholder="Min. 6 characters"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={inputCls}
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-black">
                                        Confirm Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            required
                                            placeholder="Re-enter password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className={inputCls}
                                        />
                                    </div>
                                    {confirmPassword && (
                                        <p className={`text-xs mt-1.5 font-medium ${password === confirmPassword ? 'text-green-600' : 'text-red-500'
                                            }`}>
                                            {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !password || !confirmPassword}
                                    className="flex w-full justify-center items-center gap-2 cursor-pointer rounded-md bg-orange-500 px-3 py-3 text-sm/6 font-semibold text-white hover:bg-orange-400 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Creating account...
                                        </>
                                    ) : 'Create Account'}
                                </button>
                            </form>
                        )}


                        <div className="flex items-center justify-center gap-2.5 my-6">
                            <div className="w-full h-0.5 bg-gray-200"></div>
                            <div className="text-nowrap font-medium text-base">Or continue with</div>
                            <div className="w-full h-0.5 bg-gray-200"></div>
                        </div>

                        <div className="flex gap-4">
                            <Link href={""} className='flex items-center justify-center py-3 rounded gap-2.5 w-full outline-1 outline-gray-200' onClick={() => signIn("google", { callbackUrl: "/" })}>
                                <span>
                                    <FcGoogle />
                                </span>
                                <span>Sign in with Google</span>
                            </Link>
                            {/* <a className='flex items-center justify-center py-3 rounded gap-2.5 w-full outline-1 outline-gray-200'>
                                <span>
                                    <FaGithub />
                                </span>
                                <span>Github</span>
                            </a> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login