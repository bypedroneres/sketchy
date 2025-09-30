import React from 'react';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

function ProfileSelector({ selected, setSelected }) {
  const options = [
    '/images/profiles/profile1.png',
    '/images/profiles/profile2.png',
    '/images/profiles/profile3.png',
    '/images/profiles/profile4.png',
  ];

  const handleSelect = async (src) => {
    setSelected(src);

    // Save to Firestore under user's own document
    if (!auth.currentUser) return;
    const userRef = doc(db, 'users', auth.currentUser.uid);
    await setDoc(userRef, { photoURL: src }, { merge: true });
  };

  return (
    <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', justifyContent: 'center' }}>
      {options.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Option ${i + 1}`}
          style={{
            width: 70,
            height: 70,
            borderRadius: '50%',
            border: selected === src ? '3px solid #fff' : '2px solid #888',
            cursor: 'pointer',
            objectFit: 'cover'
          }}
          onClick={() => handleSelect(src)}
        />
      ))}
    </div>
  );
}

export default ProfileSelector;
