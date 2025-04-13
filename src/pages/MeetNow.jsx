import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Format 24hr to 12hr time
const formatTime = (timeStr) => {
  const [hour, minute] = timeStr.split(':').map(Number);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
};

// UCSC campus location coordinates
const locationCoords = {
  'McHenry Library': [36.9977, -122.0586],
  'Science Hill': [36.9983, -122.0605],
  'Kresge Café': [36.9991, -122.0650],
  'Crown/Merrill Dining': [37.0003, -122.0535],
  'College Nine': [36.9999, -122.0533],
  'College Ten': [37.0002, -122.0528],
  'Cowell College': [36.9971, -122.0530],
  'Stevenson College': [36.9978, -122.0532],
  'Porter College': [36.9975, -122.0673],
  'Rachel Carson College': [36.9990, -122.0679],
  'Oakes College': [36.9947, -122.0652],
  'Kresge College': [36.9992, -122.0642],
  'Bay Tree Bookstore': [36.9963, -122.0540],
  'East Field': [36.9965, -122.0497],
  'OPERS': [36.9970, -122.0502],
  'Music Center': [36.9984, -122.0574],
  'Engineering 2': [36.9990, -122.0628]
};

function MeetNow() {
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    const fetchCheckins = async () => {
      try {
        const res = await axios.get('http://localhost:9000/api/checkin');
        console.log('✅ Check-in data:', res.data); // <-- DEBUGGING
        setCheckins(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch check-ins:', err);
      }
    };

    fetchCheckins();
  }, []);

  return (
    <div className="map-wrapper" style={{ height: '80vh', padding: '1rem' }}>
      <h1 className="text-2xl mb-4">🗺️ Who's Free Right Now</h1>
      <MapContainer center={[36.9977, -122.0586]} zoom={15} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {checkins.map((user, idx) => {
          const coords = locationCoords[user.location];
          if (!coords) {
            console.warn(`⚠️ Location not found: ${user.location}`);
            return null;
          }

          return (
            <Marker key={idx} position={coords}>
              <Popup>
                <strong>{user.email}</strong><br />
                📍 {user.location}<br />
                ⏰ Until: {formatTime(user.availableUntil)}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default MeetNow;
