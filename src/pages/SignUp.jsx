import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase'; // Make sure this path matches your project

function SignUp() {
  const [classes, setClasses] = useState([]);
  const [courseInput, setCourseInput] = useState('');
  const [year, setYear] = useState('');
  const [quarter, setQuarter] = useState('');
  const [availability, setAvailability] = useState('');
  const [mode, setMode] = useState('');
  const [message, setMessage] = useState('');

  const addClass = () => {
    if (courseInput && year && quarter) {
      setClasses([...classes, { course: courseInput, year, quarter }]);
      setCourseInput('');
      setYear('');
      setQuarter('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      setMessage('You must be logged in to submit.');
      return;
    }

    const payload = {
      uid: user.uid,
      email: user.email,
      classes,
      availability,
      mode
    };

    try {
      const response = await axios.post('http://localhost:4000/api/signup', payload);
      setMessage('Signup successful!');
    } catch (error) {
      console.error(error);
      setMessage('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Enter Classes</h2>
          <input
            type="text"
            placeholder="Course code (e.g. CS101)"
            value={courseInput}
            onChange={(e) => setCourseInput(e.target.value)}
          />
          <input
            type="text"
            placeholder="Year (e.g. 2023)"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <input
            type="text"
            placeholder="Quarter (e.g. Fall)"
            value={quarter}
            onChange={(e) => setQuarter(e.target.value)}
          />
          <button type="button" onClick={addClass}>
            Add Class
          </button>
        </div>
        <div>
          <h2>Availability</h2>
          <input
            type="text"
            placeholder="Enter your availability (e.g. MWF 10-12)"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
        </div>
        <div>
          <h2>Choose an Option</h2>
          <button type="button" onClick={() => setMode('tutor')}>
            Use Gemini AI Tutor
          </button>
          <button type="button" onClick={() => setMode('group')}>
            Find a Group
          </button>
        </div>
        <button type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}

      <div>
        <h3>Classes Added:</h3>
        <ul>
          {classes.map((cls, idx) => (
            <li key={idx}>
              {cls.course} - {cls.year} - {cls.quarter}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SignUp;
