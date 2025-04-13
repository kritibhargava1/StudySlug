import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import videoBg from "../assets/RPReplay_Final1744534717.mp4";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Video Hero Section */}
      <section className="video-container">
        <video src={videoBg} autoPlay loop muted />
        <div className="hero-overlay">
          <h1>Welcome to StudySlug</h1>
        </div>
        <div className="scroll-down">↓</div>
      </section>

      {/* Section 1: Study Buddy */}
      <section className="section">
        <h2>Find the perfect study buddy</h2>
        <p>
          Connect with Slugs in your classes and start building your study circle.
        </p>
      </section>

      {/* Section 2: Study Group */}
      <section className="section">
        <h2>Form a Study Group</h2>
        <p>
          Create or join a group based on shared schedules and academic goals.
        </p>
      </section>

      {/* Section 3: AI Help */}
      <section className="section">
        <h2>Get Instant AI Help</h2>
        <p>
          Ask questions and get assistance with tough concepts, homework, or test prep.
        </p>
      </section>

      {/* Section 4: Meet Up */}
      <section className="section">
        <h2>Meet Up in Real Time</h2>
        <p>
          See who’s studying nearby and check in to locations around campus to join them.
        </p>
        <button className="cta-button" onClick={() => navigate('/signup')}>
          Get Started
        </button>
      </section>
    </div>
  );
}

export default Home;
