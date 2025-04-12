import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [classes, setClasses] = useState([]);
  const [courseInput, setCourseInput] = useState('');
  const [year, setYear] = useState('');
  const [quarter, setQuarter] = useState('');
  const [availability, setAvailability] = useState('');
  const [mode, setMode] = useState(''); // 'tutor' or 'group'
  const [message, setMessage] = useState('');

  // Add a class to the local state
  const addClass = () => {
    if (courseInput && year && quarter) {
      setClasses([...classes, { course: courseInput, year, quarter }]);
      setCourseInput('');
      setYear('');
      setQuarter('');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { classes, availability, mode };
    try {
      const response = await axios.post('/api/signup', payload);
      setMessage('Signup successful!');
    } catch (error) {
      setMessage('Error: ' + error.response.data.error || error.message);
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
