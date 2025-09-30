import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc /*, collection, query, where, getDocs */ } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import MenuBar from '../components/MenuBar';
import Navbar from '../components/Navbar';
import './SettingsScreen.css';

function SettingsScreen() {
  const [user, setUser] = useState(null);
  // const [partner, setPartner] = useState(null);
  // const [couple, setCouple] = useState(null);
  const [selectedPic, setSelectedPic] = useState('/images/profiles/profile3.png'); // default
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && userSnap.data().photoURL) {
          setSelectedPic(userSnap.data().photoURL);
        }
        // await fetchCouple(currentUser.uid);
      }
    });
    return unsubscribe;
  }, []);

  /*
  const fetchCouple = async (uid) => {
    const couplesRef = collection(db, 'couples');
    const q = query(couplesRef, where('userIds', 'array-contains', uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const coupleData = querySnapshot.docs[0].data();
      setCouple(coupleData);

      const partnerIndex = coupleData.userIds[0] === uid ? 1 : 0;
      const yourIndex = coupleData.userIds[0] === uid ? 0 : 1;

      setSelectedPic(coupleData.userPhotos[yourIndex] || '/images/profiles/profile3.png');
      setPartner({
        photoURL: coupleData.userPhotos[partnerIndex] || '/images/profiles/profile3.png'
      });
    }
  };
  */

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
      <MenuBar />
      <Navbar />

      {/* Profile Pictures */}
      <div className="ProfileSection">
        {selectedPic && <img src={selectedPic} alt="You" className="ProfileImage" />}
        {/* {partner && <img src={partner.photoURL} alt="Partner" className="ProfileImage" />} */}
      </div>

      {/* Logout */}
      <button className="Logout_Button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default SettingsScreen;
