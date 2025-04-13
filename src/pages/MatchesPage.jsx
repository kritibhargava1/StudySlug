import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import '../styles/MatchesPage.css';

function MatchesPage() {
  const [allStudents, setAllStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(':').map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 || 12;
    return `${adjustedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
  };

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const token = await auth.currentUser.getIdToken();
        const res = await axios.get('http://localhost:9000/api/all-students', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const seen = new Set();
        const uniqueStudents = res.data.filter((student) => {
          if (seen.has(student.email)) return false;
          seen.add(student.email);
          return true;
        });

        setAllStudents(uniqueStudents);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch student data.');
      } finally {
        setLoading(false);
      }
    };

    if (auth.currentUser) {
      fetchAllStudents();
    }
  }, []);

  const filteredStudents = allStudents.filter((student) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      student.email?.toLowerCase().includes(lowerSearch) ||
      student.classes?.some(cls =>
        `${cls.course} ${cls.quarter} ${cls.year}`.toLowerCase().includes(lowerSearch)
      ) ||
      Object.keys(student.availability || {}).some(day =>
        day.toLowerCase().includes(lowerSearch)
      )
    );
  });

  return (
    <div className="matches-container">
      <h1 className="matches-heading">📋 All Students in Database</h1>

      <input
        type="text"
        className="matches-search-input"
        placeholder="Search by course (e.g. CSE101), email, or day"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <p>Loading student data...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && searchTerm && filteredStudents.length > 0 ? (
        <table className="matches-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Classes</th>
              <th>Availability</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.firstName || ''} {student.lastName || ''}</td>
                <td>{student.email}</td>
                <td>
                  <ul>
                    {student.classes?.map((cls, idx) => (
                      <li key={idx}>{cls.course} ({cls.quarter} {cls.year})</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {student.availability &&
                      Object.entries(student.availability).map(([day, slots]) => (
                        <li key={day}>
                          {day}: {slots.map((slot) => `${formatTime(slot.from)}–${formatTime(slot.to)}`).join(', ')}
                        </li>
                      ))}
                  </ul>
                </td>
                <td>
                  <button className="matches-button">Message</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && searchTerm && <p>No matching students found.</p>
      )}
    </div>
  );
}

export default MatchesPage;
