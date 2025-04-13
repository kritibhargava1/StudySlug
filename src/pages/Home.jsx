import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

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
