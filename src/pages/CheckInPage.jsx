import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import mongoose from 'mongoose';

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
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">📍 Check In</h1>
      <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-2 mb-2 border rounded">
        <option value="">Select location</option>
        {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
      </select>
      <input
        type="time"
        value={availableUntil}
        onChange={(e) => setAvailableUntil(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Available until"
      />
      <button onClick={handleCheckIn} className="bg-purple-600 text-white px-4 py-2 rounded">Check In</button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}

export default CheckInPage;







