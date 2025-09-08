import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone } from 'react-icons/fa';
// NOTE: The path to AuthContext is assumed. Please adjust if it's different in your project structure.
import { useAuth } from '../../context/AuthContext';

function Footer() {
    // Assuming a custom hook `useAuth` provides authentication state and a logout function.
    // The `|| {}` provides a fallback to prevent errors if the context is not available.
    const { isLoggedIn, logout } = useAuth() || {};
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section about">
                    <h2 className="footer-logo">Brain Tumor Detection</h2>
                    <p>
                        Leveraging AI to provide fast and accurate brain tumor detection from MRI scans. Our mission is to aid medical professionals in early diagnosis.
                    </p>
                </div>
                <nav className="footer-section links" aria-label="Footer Navigation">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/detection">Detection</Link></li>
                        {isLoggedIn ? (
                            <>
                                <li><Link to="/history">History</Link></li>
                                <li><button onClick={handleLogout} className="footer-logout-btn">Logout</button></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/signup">Signup</Link></li>
                            </>
                        )}
                    </ul>
                </nav> 
                <div className="footer-social-contact">
                    <div className="footer-block">
                        <h3 className="footer-title">Follow Us</h3>
                        <div className="footer-underline"></div>
                        <div className="social-icons">
                            <a href="https://github.com/RAK4307" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
                            <a href="https://linkedin.com/in/anil-kumar-rayapudi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
                        </div>
                    </div>
                    <div className="footer-block">
                        <h3 className="footer-title">Contact Us</h3>
                        <div className="footer-underline"></div>
                        <div className="contact-info">
                            <p><FaEnvelope /> kanil25566@gmail.com</p>
                            <p><FaPhone /> +91 8142416063</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Brain Tumor Detection. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;