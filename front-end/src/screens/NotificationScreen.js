import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import './NotificationScreen.css';

function NotificationsScreen() {
  const [topUsers, setTopUsers] = useState([]);
  const [topCombinations, setTopCombinations] = useState([]);

  useEffect(() => {
    // Example: fetch top users from Firestore
    const fetchTopUsers = async () => {
      try {
        const q = query(collection(db, 'users'), orderBy('score', 'desc'), limit(5));
        const snapshot = await getDocs(q);
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTopUsers(users);
      } catch (err) {
        console.error('Failed to fetch top users', err);
      }
    };

    // Example: fetch top dice combinations
    const fetchTopCombinations = async () => {
      // Example static data, replace with Firestore query
      setTopCombinations([
        { combo: '6 + 6', count: 12 },
        { combo: '5 + 5', count: 9 },
        { combo: '1 + 1', count: 7 },
      ]);
    };

    fetchTopUsers();
    fetchTopCombinations();
  }, []);

  return (
    <div className="NotificationsScreen">
      <h1>Notifications & Rankings</h1>

      <section className="notification-section">
        <h2>🏆 Top Users This Week</h2>
        <ul className="notification-list">
          {topUsers.map((user, index) => (
            <li key={user.id} className="notification-item">
              <span className="rank">{index + 1}.</span>
              <img src={user.photoURL || '/images/profiles/profile3.png'} alt={user.name} className="user-avatar"/>
              <span className="user-name">{user.name}</span>
              <span className="user-score">{user.score} pts</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="notification-section">
        <h2>🎲 Top Dice Combinations</h2>
        <ul className="notification-list">
          {topCombinations.map((item, index) => (
            <li key={index} className="notification-item">
              <span className="rank">{index + 1}.</span>
              <span className="combo">{item.combo}</span>
              <span className="combo-count">{item.count} times</span>
            </li>
          ))}
        </ul>
      </section>

      <Navbar />
    </div>
  );
}

export default NotificationsScreen;
