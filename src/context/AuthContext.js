import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const navigate = useNavigate();

    // This effect could be used to verify the token with the backend on app load
    useEffect(() => {
        // For example, you could make an API call to a '/verify-token' endpoint
    }, []);

    const login = (newToken) => {
        localStorage.setItem('authToken', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        // Clear other user-specific data
        localStorage.removeItem('analysisHistory');
        setToken(null);
        navigate('/login');
    };

    const value = {
        token,
        isLoggedIn: !!token,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};