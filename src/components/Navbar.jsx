import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navigation-bar">
      <div className="nav-content">
        <div className="nav-buttons">
          <button className="navigation-button" onClick={() => navigate('/home')}>Home</button>
          <button className="navigation-button" onClick={() => navigate('/checkin')}>Check In</button>
          <button className="navigation-button" onClick={() => navigate('/contact')}>Contact</button>
          <button className="navigation-button" onClick={() => navigate('/signup')}>Profile</button>
          <button className="navigation-button" onClick={() => navigate('/tutors')}>AI Tutor</button>
          <button className="navigation-button" onClick={() => navigate('/matches')}>Study Buddies</button>
          <button className="navigation-button" onClick={() => navigate('/meet-now')}>Map</button>
        </div>
        <div className="nav-profile">
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
