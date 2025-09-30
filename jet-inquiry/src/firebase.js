import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDhvlW2ri41ld2cNuUm0yFPD9dE1xG-JNs",
  authDomain: "sketch-sex.firebaseapp.com",
  projectId: "sketch-sex",
  storageBucket: "sketch-sex.appspot.com", // ✅ FIXED
  messagingSenderId: "146499468807",
  appId: "1:146499468807:web:5ce42884f3321376af34a2",
  measurementId: "G-G8VCTVK48Q"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, provider, storage };
