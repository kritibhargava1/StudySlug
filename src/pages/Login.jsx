import React, { useState } from 'react';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.endsWith('@ucsc.edu')) {
      setError('Please use a @ucsc.edu email.');
      return;
    }

    window.location.href = '/home'; // Simulated redirect
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <h1 className="loginTitle">Welcome to SlugStudy 🐌</h1>
        <p className="loginSubtitle">Login with your UCSC email</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="you@ucsc.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="loginInput"
          />
          <button type="submit" className="loginButton">Log In</button>
          {error && <p className="loginError">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
