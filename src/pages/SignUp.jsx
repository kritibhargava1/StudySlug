import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function SignUp() {
  const [classes, setClasses] = useState([]);
  const [courseInput, setCourseInput] = useState('');
  const [year, setYear] = useState('');
  const [quarter, setQuarter] = useState('');

  const [availability, setAvailability] = useState({});
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');

  const [message, setMessage] = useState('');
  const [showMatchesButton, setShowMatchesButton] = useState(false);
  const navigate = useNavigate();

  const addClass = () => {
    if (courseInput && year && quarter) {
      setClasses(prev => [...prev, { course: courseInput, year, quarter }]);
      setCourseInput('');
      setYear('');
      setQuarter('');
    }
  };

  const addAvailabilitySlot = () => {
    if (!fromTime || !toTime || fromTime >= toTime) return;

    setAvailability(prev => {
      const updated = { ...prev };
      if (!updated[selectedDay]) updated[selectedDay] = [];
      updated[selectedDay].push({ from: fromTime, to: toTime });
      return updated;
    });

    setFromTime('');
    setToTime('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      setMessage("You must be logged in.");
      return;
    }

    const payload = {
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
      classes,
      availability
    };

    try {
      const response = await axios.post('http://localhost:4000/api/signup', payload);
      setMessage('Signup successful!');
      setShowMatchesButton(true);
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {/* Class Input */}
        <div>
          <h2>Add Class</h2>
          <input
            type="text"
            placeholder="Course code (e.g. CSE101)"
            value={courseInput}
            onChange={(e) => setCourseInput(e.target.value)}
          />
          <input
            type="text"
            placeholder="Year (e.g. 2025)"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <input
            type="text"
            placeholder="Quarter (e.g. Spring)"
            value={quarter}
            onChange={(e) => setQuarter(e.target.value)}
          />
          <button type="button" onClick={addClass}>Add Class</button>

          {classes.length > 0 && (
            <ul style={{ marginTop: '1rem' }}>
              {classes.map((cls, idx) => (
                <li key={idx}>{cls.course} ({cls.quarter} {cls.year})</li>
              ))}
            </ul>
          )}
        </div>

        {/* Availability Picker */}
        <div style={{ marginTop: '2rem' }}>
          <h2>Availability</h2>
          <label>Day: </label>
          <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>

          <div style={{ marginTop: '8px' }}>
            <label>From: </label>
            <input type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} />

            <label style={{ marginLeft: '12px' }}>To: </label>
            <input type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} />

            <button type="button" onClick={addAvailabilitySlot} style={{ marginLeft: '12px' }}>
              ➕ Add Slot
            </button>
          </div>

          <div style={{ marginTop: '12px' }}>
            <ul>
              {Object.entries(availability).map(([day, slots]) => (
                <li key={day}>
                  <strong>{day}:</strong>{' '}
                  {slots.map((slot, idx) => `${slot.from}–${slot.to}`).join(', ')}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button type="submit" style={{ marginTop: '2rem' }}>Submit</button>
        {message && <p>{message}</p>}

        {showMatchesButton && (
          <button
            onClick={() => navigate('/matches')}
            style={{ marginTop: '1rem', padding: '10px 16px', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '8px' }}
          >
            👥 Meet Students in Your Class
          </button>
        )}
      </form>
    </div>
  );
}

export default SignUp;
