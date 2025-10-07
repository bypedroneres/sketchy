import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './SettingsScreen.css';
import Plans from '../components/Plans';

function SettingsScreen() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/sign-in');
    } catch (error) {
      alert('Logout failed: ' + error.message);
    }
  };

  return (
    <div className="SettingsScreen">
      <Navbar />

      {/* User Info */}
      {user && (
        <div className="ProfileSection">
          <img
            src={user.photoURL || '/images/profiles/profile3.png'}
            alt="Profile"
            className="ProfileImage"
          />
          <h2 className="UserName">{user.displayName || 'User'}</h2>
        </div>
      )}

      {/* Logout */}
      <button className="LogoutButton" onClick={handleLogout}>
        Logout
      </button>
      <Plans />
    </div>
  );
}

export default SettingsScreen;
