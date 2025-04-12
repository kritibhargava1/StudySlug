import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; // Adjust the path as necessary

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">
        Find the perfect study buddy. Or the perfect tutor.
        </h1>
        <div className="home-buttons">
          <button
            onClick={() => navigate('/how-it-works')}
            className="home-button"
          >
            How it works
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="home-button"
          >
            Contact us
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="home-button"
          >
            Sign up page
          </button>
          <button
            onClick={() => navigate('/tutors')}
            className="home-button"
          >
            Need help in a subject?
          </button>
          <button
            onClick={() => navigate('/study-groups')}
            className="home-button"
          >
            Looking for a study group?
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
