import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import '../styles/Navbar.css';
import logo from '../assets/logo.png'; // Import the logo image

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navigation-bar">
      <div className="nav-content">
        {/* Insert the logo image at the beginning */}
        <img
          src={logo}
          alt="Slug Logo"
          className="nav-logo"
          onClick={() => navigate('/home')}
        />
        <button className="navigation-button" onClick={() => navigate('/home')}>
          Home
        </button>
        <button className="navigation-button" onClick={() => navigate('/checkin')}>
          Check In
        </button>
        <button className="navigation-button" onClick={() => navigate('/contact')}>
          Contact
        </button>
        <button className="navigation-button" onClick={() => navigate('/signup')}>
          Sign Up
        </button>
        <button className="navigation-button" onClick={() => navigate('/tutors')}>
          AI Tutor
        </button>
        <button className="navigation-button" onClick={() => navigate('/matches')}>
          Study Buddy
        </button>
        <button className="navigation-button" onClick={() => navigate('/meet-now')}>
          Map
        </button>
        {/* Include the profile button as part of the nav-content */}
        <ProfileDropdown />
      </div>
    </nav>
  );
}

export default Navbar;
