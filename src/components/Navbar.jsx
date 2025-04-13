import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import '../styles/Navbar.css'; // Use the correct path
import logo from '../assets/logo.png'; // ✅ Logo included

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navigation-bar">
      <div className="nav-content">
        {/* Logo on the left */}
        <img
          src={logo}
          alt="Slug Logo"
          className="nav-logo"
          onClick={() => navigate('/home')}
          style={{ cursor: 'pointer', height: '40px', marginRight: '1rem' }}
        />

        {/* Navigation buttons */}
        <div className="nav-buttons">
          <button className="navigation-button" onClick={() => navigate('/home')}>Home</button>
          <button className="navigation-button" onClick={() => navigate('/checkin')}>Check In</button>
          <button className="navigation-button" onClick={() => navigate('/contact')}>Contact</button>
          <button className="navigation-button" onClick={() => navigate('/signup')}>Profile</button>
          <button className="navigation-button" onClick={() => navigate('/tutors')}>AI Tutor</button>
          <button className="navigation-button" onClick={() => navigate('/matches')}>Study Buddies</button>
          <button className="navigation-button" onClick={() => navigate('/meet-now')}>Map</button>
        </div>

        {/* Profile dropdown on the right */}
        <div className="nav-profile">
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
