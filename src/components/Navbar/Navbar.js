import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/login.png'; // Adjust path if needed

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setMenuOpen(false); // Close mobile menu on logout
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="main-navbar">
      <NavLink to="/" className="navbar-logo">
        <img src={logoImg} alt="DeepNeuroVision Logo" className="navbar-logo-img" />
        <span className="navbar-title">DeepNeuroVision</span>
      </NavLink>

      <button
        className="nav-toggle"
        aria-label="Toggle navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="nav-toggle-bar"></span>
        <span className="nav-toggle-bar"></span>
        <span className="nav-toggle-bar"></span>
      </button>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {isLoggedIn ? (
          <> 
            <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
            <NavLink to="/about" onClick={closeMenu}>About</NavLink>
            <NavLink to="/detection" onClick={closeMenu}>Detection</NavLink>
            <NavLink to="/history" onClick={closeMenu}>History</NavLink>
            <button className="navbar-logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
            <NavLink to="/about" onClick={closeMenu}>About</NavLink>
            <NavLink to="/detection" onClick={closeMenu}>Detection</NavLink>
            <NavLink to="/login" onClick={closeMenu}>Login</NavLink>
            <NavLink to="/signup" onClick={closeMenu}>Signup</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;