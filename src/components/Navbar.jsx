import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Make sure this path is correct

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navigation-bar"> 
      <button className="navigation-button" onClick={() => navigate('/home')}>Home</button>
      <button className="navigation-button" onClick={() => navigate('/how-it-works')}>How it works</button>
      <button className="navigation-button" onClick={() => navigate('/contact')}>Contact</button>
      <button className="navigation-button" onClick={() => navigate('/signup')}>Sign Up</button>
      <button className="navigation-button" onClick={() => navigate('/tutors')}>Tutors</button>
      <button className="navigation-button" onClick={() => navigate('/study-groups')}>Study Groups</button>
    </nav>
  );
}

export default Navbar;
