import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './SignupPage.css';
import logIcon from '../../assets/login.png'; // Adjust path if needed

function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsError(false);
        setMessage('');

        if (password !== confirmPassword) {
            setIsError(true);
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/signup', {
                username,
                email,
                password,
            });

            const { token } = response.data;
            login(token); // Log the user in automatically

            setMessage('Signup successful! Redirecting...');
            setTimeout(() => navigate('/detection'), 1500);
        } catch (err) {
            setIsError(true);
            console.error("Signup error:", err); // Detailed logging

            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Error data:", err.response.data);
                setMessage(err.response.data.message || `Signup failed. Server responded with status ${err.response.status}.`);
            } else if (err.request) {
                // The request was made but no response was received
                console.error("No response received:", err.request);
                setMessage('Signup failed: The server is not responding. Please ensure the backend is running and accessible.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', err.message);
                setMessage('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-brand-panel">
                    <div className="signup-brand-icon">
                        <img
                            src={logIcon}
                            alt="Brain Tumor Detection Logo"
                            style={{
                                width: '130px',
                                height: '130px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                boxShadow: '0 2px 12px rgba(52, 152, 219, 0.10)'
                            }}
                        />
                    </div>
                    <h1>Brain Tumor Detection</h1>
                    <p>
                        Join us and leverage AI for fast, accurate brain tumor detection from MRI scans. Create your account to get started!
                    </p>
                </div>
                <form className="signup-form-card" onSubmit={handleSubmit}>
                    {message && (
                        <div className={`signup-message ${isError ? 'error' : 'success'}`}>
                            {message}
                        </div>
                    )}
                    <h2 className="signup-form-title">Create Account</h2>
                    <div className="signup-form-group">
                        <label className="signup-form-label" htmlFor="signup-username">Username</label>
                        <input
                            type="text"
                            id="signup-username"
                            className="signup-form-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Choose a username"
                        />
                    </div>
                    <div className="signup-form-group">
                        <label className="signup-form-label" htmlFor="signup-email">Email</label>
                        <input
                            type="email"
                            id="signup-email"
                            className="signup-form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                        />
                    </div>
                    <div className="signup-form-group">
                        <label className="signup-form-label" htmlFor="signup-password">Password</label>
                        <input
                            type="password"
                            id="signup-password"
                            className="signup-form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Create a strong password"
                        />
                    </div>
                    <div className="signup-form-group">
                        <label className="signup-form-label" htmlFor="signup-confirm-password">Confirm Password</label>
                        <input
                            type="password"
                            id="signup-confirm-password"
                            className="signup-form-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Re-enter your password"
                        />
                    </div>
                    <button type="submit" className="signup-button">Sign Up</button>
                    <p className="signup-switch-auth">
                        Already have an account? <Link to="/login">Log In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;
