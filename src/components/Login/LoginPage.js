import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';
import logIcon from '../../assets/login.png'; // Adjust the path if needed

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsError(false);
        setMessage('');

        try {
            const response = await axios.post('http://127.0.0.1:5000/login', {
                email,
                password,
            });

            const { token } = response.data;
            login(token); // Use context to store the token and update state

            setMessage('Login successfully!');
            setTimeout(() => {
                navigate('/detection');
            }, 1000);
        } catch (error) {
            setIsError(true);
            console.error("Login error:", error); // Detailed logging

            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Error data:", error.response.data);
                setMessage(error.response.data.message || `Login failed. Server responded with status ${error.response.status}.`);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received:", error.request);
                setMessage('Login failed: The server is not responding. Please ensure the backend is running and accessible.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', error.message);
                setMessage('An unexpected error occurred. Please try again.');
            }
        } 
    };

    return (
        <div className="login-page-bg">
            {message && (
                <div className={isError ? 'login-error-toast' : 'login-success-toast'}>
                    {message}
                </div>
            )}
            <div className="login-card">
                <div className="login-brand-panel">
                    <div className="brand-icon">
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
                        Welcome back! Please login to access your dashboard and start detecting brain tumors from MRI scans.
                    </p>
                </div>
                <form className="login-form-panel" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="submit" className="auth-button">Login</button>
                    <p className="switch-auth">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
