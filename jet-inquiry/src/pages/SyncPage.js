import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import ProfileSelector from '../components/ProfileSelector';

function SyncPage() {
  const { inviterId } = useParams();
  const navigate = useNavigate();
  const [selectedPic, setSelectedPic] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) return navigate('/sign-in');
      setUser(currentUser);

      // Check if this user already has a couple doc
      const coupleRef = doc(db, 'couples', `${inviterId}_${currentUser.uid}`);
      const coupleSnap = await getDoc(coupleRef);
      if (coupleSnap.exists() && coupleSnap.data().synced) {
        navigate('/settings'); // Already synced
      }
    });

    return unsubscribe;
  }, [inviterId, navigate]);

  const handleAccept = async () => {
    if (!selectedPic) return alert('Select a profile picture first');

    const partnerId = user.uid;
    const coupleId = `${inviterId}_${partnerId}`;
    const coupleRef = doc(db, 'couples', coupleId);

    // Fetch inviter photo from Firestore users collection
    const inviterRef = doc(db, 'users', inviterId);
    const inviterSnap = await getDoc(inviterRef);
    if (!inviterSnap.exists()) return alert('Inviter profile not found');

    const inviterPhotoURL = inviterSnap.data().photoURL;

    // Save couple doc with both photos
    await setDoc(coupleRef, {
      userIds: [inviterId, partnerId],
      userPhotos: [inviterPhotoURL, selectedPic],
      startedAt: serverTimestamp(),
      synced: true,
      totalFucks: 0
    });

    // Save partner photo in their own user doc
    await setDoc(doc(db, 'users', partnerId), { photoURL: selectedPic }, { merge: true });

    navigate('/settings');
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: '#000',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h2>Accept Invite</h2>
      <p>Select your profile picture to sync with your partner</p>
      <ProfileSelector selected={selectedPic} setSelected={setSelectedPic} />
      <button
        onClick={handleAccept}
        style={{
          padding: '10px 20px',
          cursor: 'pointer',
          background: '#fff',
          color: '#000',
          border: 'none',
          borderRadius: '8px',
          marginTop: '20px'
        }}
      >
        Accept & Sync
      </button>
    </div>
  );
}

export default SyncPage;
