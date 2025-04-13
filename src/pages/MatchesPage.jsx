import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase';

function MatchesPage() {
  const [allStudents, setAllStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const token = await auth.currentUser.getIdToken();
        const res = await axios.get('http://localhost:4000/api/all-students', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Remove duplicate emails (keep first occurrence)
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
      }
    };

    if (auth.currentUser) {
      fetchAllStudents();
    }
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>📋 All Students in Database</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {allStudents.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '2px solid #ccc', padding: '8px' }}>Name</th>
              <th style={{ borderBottom: '2px solid #ccc', padding: '8px' }}>Email</th>
              <th style={{ borderBottom: '2px solid #ccc', padding: '8px' }}>Classes</th>
              <th style={{ borderBottom: '2px solid #ccc', padding: '8px' }}>Availability</th>
              <th style={{ borderBottom: '2px solid #ccc', padding: '8px' }}>Message</th>
            </tr>
          </thead>
          <tbody>
            {allStudents.map((student) => (
              <tr key={student._id}>
                <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{student.firstName || ''} {student.lastName || ''}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{student.email}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>
                  <ul>
                    {student.classes?.map((cls, idx) => (
                      <li key={idx}>{cls.course} ({cls.quarter} {cls.year})</li>
                    ))}
                  </ul>
                </td>
                <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>
                  <ul>
                    {student.availability &&
                      Object.entries(student.availability).map(([day, slots]) => (
                        <li key={day}>
                          {day}: {slots.map((slot) => `${slot.from}–${slot.to}`).join(', ')}
                        </li>
                      ))}
                  </ul>
                </td>
                <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>
                  <button style={{ padding: '6px 10px', backgroundColor: '#7c3aed', color: '#fff', border: 'none', borderRadius: '6px' }}>
                    Message
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No student data found.</p>
      )}
    </div>
  );
}

export default MatchesPage;
