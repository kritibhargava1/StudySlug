import React from 'react';
import '../styles/HowItWorks.css'; // Make sure the path is correct

function HowItWorks() {
  return (
    <div className="how-it-works-container">
      <div className="how-it-works-card">
        <h1 className="how-it-works-title">How It Works</h1>
        <p className="how-it-works-text">
          SlugStudy connects UCSC students through class and schedule matching.
          Fill out your info and we’ll do the rest.
        </p>
      </div>
    </div>
  );
}

export default HowItWorks;
