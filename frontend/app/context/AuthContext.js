"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // true while checking session

    // On app load, check if user is already logged in (session restore)
    useEffect(() => {
        const restoreSession = async () => {
            try {
                const data = await axios.get(`${API}/auth/me`, { withCredentials: true });
                setUser(data.user);
            } catch (err) {
                setUser(null); // no valid session
            } finally {
                setLoading(false);
            }
        };
        restoreSession();
    }, []);

    // Call after successful login/register
    // Backend already set the httpOnly cookie — we just store user info in state

    const login = (userData) => {
        setUser(userData); // NO token stored anywhere in JS
    };

    // Call on logout — hits backend to clear cookie
    const logout = async () => {
        try {
            await axios.post(`${API}/auth/logout`);
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);

