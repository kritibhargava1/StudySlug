import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import mongoose from 'mongoose';
import '../styles/CheckInPage.css'; // Import the CSS file

const locations = [
  'McHenry Library',
  'Science Hill',
  'Kresge Café',
  'Crown/Merrill Dining',
  'College Nine',
  'College Ten',
  'Cowell College',
  'Stevenson College',
  'Porter College',
  'Rachel Carson College',
  'Oakes College',
  'Kresge College',
  'Bay Tree Bookstore',
  'East Field',
  'OPERS',
  'Music Center',
  'Engineering 2'
];

function CheckInPage() {
  const [location, setLocation] = useState('');
  const [availableUntil, setAvailableUntil] = useState('');
  const [message, setMessage] = useState('');

  const handleCheckIn = async () => {
    if (!auth.currentUser) {
      setMessage('Please log in first.');
      return;
    }

    const payload = {
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
      location,
      availableUntil
    };

    try {
      await axios.post('http://localhost:9000/api/checkin', payload);
      setMessage(`✅ Checked in at ${location}`);
    } catch (err) {
      setMessage('❌ Error checking in');
    }
  };

  return (
    <div className="page-container">
      <div className="checkin-container">
        <h1 className="checkin-title">Check In</h1>
        <p className="checkin-info">
          Check in to let other students know when you're looking for a study buddy!
        </p>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="checkin-select"
        >
          <option value="">Select location</option>
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <input
          type="time"
          value={availableUntil}
          onChange={(e) => setAvailableUntil(e.target.value)}
          className="checkin-input"
          placeholder="Available until"
        />
        <button onClick={handleCheckIn} className="checkin-button">
          Check In
        </button>
        {message && <p className="checkin-message">{message}</p>}
      </div>
    </div>
  );
}

export default CheckInPage;
