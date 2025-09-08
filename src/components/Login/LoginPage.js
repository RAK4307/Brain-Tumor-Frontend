import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';
import logIcon from '../../assets/login.png'; // Adjust the path if needed
import ForgotPassword from '../ForgotPassword/ForgotPassword';

function generateCaptchaText() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
}

function CaptchaSVG({ text }) {
  const width = 160;
  const height = 48;
  const charSpacing = width / (text.length + 1);
  const colors = ['#1a237e', '#1565c0', '#283593', '#3949ab'];
  return (
    <svg className="captcha-svg-unique" width={width} height={height}>
      {[...Array(5)].map((_, i) => (
        <line
          key={i}
          x1={Math.random() * width}
          y1={Math.random() * height}
          x2={Math.random() * width}
          y2={Math.random() * height}
          stroke={colors[Math.floor(Math.random() * colors.length)]}
          strokeWidth={1.5}
          opacity={0.6}
        />
      ))}
      {text.split('').map((char, i) => (
        <text
          key={i}
          x={charSpacing * (i + 1)}
          y={height / 2 + (Math.random() * 10 - 5)}
          fontSize="2rem"
          fontFamily="'Fira Mono', 'Consolas', monospace"
          fill={colors[i % colors.length]}
          fontWeight="bold"
          transform={`rotate(${Math.random() * 30 - 15} ${charSpacing * (i + 1)} ${height / 2}) skewX(${Math.random() * 20 - 10})`}
        >
          {char}
        </text>
      ))}
    </svg>
  );
}

const LoginPage = () => {
  const [captcha, setCaptcha] = useState(generateCaptchaText());
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleCaptchaChange = (e) => {
    setCaptchaInput(e.target.value.toUpperCase());
    setCaptchaError('');
    setLoginError('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setLoginError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setLoginError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError('Please enter both email and password.');
      return;
    }
    if (captchaInput !== captcha) {
      setCaptchaError('Captcha does not match. Please try again.');
      setCaptcha(generateCaptchaText());
      setCaptchaInput('');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email,
        password,
      });

      const { token } = response.data;
      login(token); // Use context to store the token and update state

      setLoginError('');
      setLoginSuccess('Login successful!');
      setTimeout(() => {
        navigate('/detection');
      }, 1000);
    } catch (error) {
      setLoginError('Invalid email or password.');
      setLoginSuccess('');
      console.error("Login error:", error); // Detailed logging

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
    } 
  };

  return (
    <div className="login-page-bg">
      <div className="login-card">
        <div className="login-brand-panel">
          <div className="brand-icon">
            <img
              src={logIcon}
              alt="Brain Tumor Detection Logo"
              className="logo-image"
            />
          </div>
          <h1>Brain Tumor Detection</h1>
          <p>
            Welcome back! Please login to access your dashboard and start detecting brain tumors from MRI scans.
          </p>
        </div>
        <form className="login-form-panel" onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
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
              onChange={handlePasswordChange}
              required
              placeholder="••••••••"
            />
            <div className="login-forgot">
              <button
                type="button"
                className="login-forgot-link"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </button>
            </div>
          </div>
          {/* Blurred CAPTCHA */}
          <div className="login-captcha-unique">
            <label htmlFor="captcha-input" className="login-captcha-label-unique">Captcha *</label>
            <CaptchaSVG text={captcha} />
            <label htmlFor="captcha-input" className="login-captcha-input-label-unique">Type the text displayed above:</label>
            <input
              id="captcha-input"
              type="text"
              placeholder="Enter CAPTCHA"
              value={captchaInput}
              onChange={handleCaptchaChange}
              required
            />
            {captchaError && (
              <div className="captcha-error-unique">{captchaError}</div>
            )}
          </div>
          <button type="submit" className="auth-button login-button">Login</button>
          {loginError && (
            <div className="login-error-msg">{loginError}</div>
          )}
          {loginSuccess && (
            <div className="login-success-msg">{loginSuccess}</div>
          )}
          <p className="switch-auth">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
        {showForgot && <ForgotPassword />}
      </div>
    </div>
  );
}

export default LoginPage;
