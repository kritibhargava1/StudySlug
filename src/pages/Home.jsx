import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Navigation Tab at the top */}
      <nav className="home-nav">
        <button onClick={() => navigate('/how-it-works')} className="home-button">
          How it works
        </button>
        <button onClick={() => navigate('/contact')} className="home-button">
          Contact us
        </button>
        <button onClick={() => navigate('/signup')} className="home-button">
          Sign up page
        </button>
        <button onClick={() => navigate('/tutors')} className="home-button">
          Need help in a subject?
        </button>
        <button onClick={() => navigate('/study-groups')} className="home-button">
          Looking for a study group?
        </button>
      </nav>

      {/* Hero Section with animated background and CTA */}
      <section className="hero-section">
        <h1 className="hero-title">
          Find the perfect study buddy. Or the perfect tutor.
        </h1>
        <p className="hero-subtitle">
          Connect, learn, and succeed together.
        </p>
        <button onClick={() => navigate('/signup')} className="hero-button">
          Get Started
        </button>
      </section>
    </div>
  );
}

export default Home;
