import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import '../styles/ProfileDropdown.css'; // New CSS file for the dropdown

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
    <div className="profile-dropdown-container">
      <button
        className="profile-button"
        onClick={() => setOpen(!open)}
      >
        👤 {user.email.split('@')[0]}
      </button>

      {open && (
        <div className="profile-dropdown-menu">
          <p className="profile-email">{user.email}</p>
          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
