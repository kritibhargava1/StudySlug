import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = auth.currentUser;

  if (!user) return null;

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/'); // Redirect to login
  };

  return (
    <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1000 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          backgroundColor: '#F8DE7E',
          border: 'none',
          fontWeight: 500,
          cursor: 'pointer'
        }}
      >
        👤 {user.email.split('@')[0]}
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: '2.5rem',
          right: 0,
          background: 'white',
          border: '1px solid #ccc',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}>
          <p style={{ margin: 0 }}>{user.email}</p>
          <button
            onClick={handleLogout}
            style={{
              marginTop: '0.5rem',
              padding: '0.5rem',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
