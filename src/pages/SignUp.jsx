import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function SignUp() {
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
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

  useEffect(() => {
    const checkProfile = async () => {
      if (!auth.currentUser) return;
      const uid = auth.currentUser.uid;
      try {
        const res = await axios.get(`http://localhost:4000/api/profile-exists/${uid}`);
        if (res.data.exists) {
          setAlreadySubmitted(true);
          setMessage("✅ You've already submitted your profile. You can view or update your info below.");
        }
      } catch (err) {
        console.error('Failed to check if profile exists', err);
      }
    };

    checkProfile();
  }, []);

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
      classes,
      availability,
    };

    try {
      const uid = auth.currentUser.uid;
      if (alreadySubmitted) {
        await axios.put(`http://localhost:4000/api/update-profile/${uid}`, payload);
        setMessage("Profile updated successfully!");
      } else {
        await axios.post("http://localhost:4000/api/signup", {
          uid,
          email: auth.currentUser.email,
          ...payload,
        });
        setMessage("Signup successful!");
        setAlreadySubmitted(true);
      }
      setShowMatchesButton(true);
    } catch (error) {
      console.error("Submit error:", error);
      setMessage("Error: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Sign Up</h1>
        {message && <p className="signup-message">{message}</p>}

        {alreadySubmitted && (
          <div style={{ marginBottom: '2rem' }}>
            <button
              onClick={handleSubmit}
              className="signup-button"
              style={{ marginRight: '1rem' }}
            >
              ✏️ Update My Info
            </button>
            <button
              onClick={() => navigate('/matches')}
              className="signup-button"
              style={{ background: '#10b981', color: 'white' }}
            >
              👥 Go to Matches
            </button>
          </div>
        )}

        {!alreadySubmitted && (
          <form onSubmit={handleSubmit}>
            <div>
              <h2 className="signup-section-title">📘 Add Your Classes</h2>
              <input type="text" placeholder="Course code (e.g. CSE101)" value={courseInput} onChange={(e) => setCourseInput(e.target.value)} />
              <input type="text" placeholder="Year (e.g. 2025)" value={year} onChange={(e) => setYear(e.target.value)} />
              <input type="text" placeholder="Quarter (e.g. Spring)" value={quarter} onChange={(e) => setQuarter(e.target.value)} />
              <button type="button" onClick={addClass}>Add Class</button>
              {classes.length > 0 && (
                <ul>
                  {classes.map((cls, idx) => (
                    <li key={idx}>{cls.course} ({cls.quarter} {cls.year})</li>
                  ))}
                </ul>
              )}
            </div>

            <div style={{ marginTop: '2rem' }}>
              <h2 className="signup-section-title">⏰ Set Your Weekly Availability</h2>
              <label>Day:</label>
              <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>

              <div style={{ marginTop: '8px' }}>
                <label>From:</label>
                <input type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} />

                <label style={{ marginLeft: '12px' }}>To:</label>
                <input type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} />

                <button type="button" onClick={addAvailabilitySlot} style={{ marginLeft: '12px' }}>
                  ➕ Add Slot
                </button>
              </div>

              <ul>
                {Object.entries(availability).map(([day, slots]) => (
                  <li key={day}>
                    <strong>{day}:</strong>{' '}
                    {slots.map((slot, idx) => `${slot.from}–${slot.to}`).join(', ')}
                  </li>
                ))}
              </ul>
            </div>

            <button type="submit" style={{ marginTop: '2rem' }}>Submit</button>

            {showMatchesButton && (
              <button
                onClick={() => navigate('/matches')}
                className="signup-button"
                style={{ marginTop: '1rem', background: '#7c3aed', color: 'white' }}
              >
                👥 Meet Students in Your Class
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default SignUp;
