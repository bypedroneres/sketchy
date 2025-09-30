import React, { useRef, useState } from 'react';
import '../screens/LoginScreen.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignUpScreen = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Create default profile picture for new users
  const createDefaultProfile = async (uid) => {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, {
      photoURL: "/images/profiles/profile3.png", // default profile picture
      createdAt: Date.now(),
    }, { merge: true });
  };

  const signUp = async (e) => {
    e.preventDefault();
    setError('');

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await createDefaultProfile(userCredential.user.uid); // add default profile
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      await createDefaultProfile(result.user.uid); // add default profile
      navigate('/dashboard');
    } catch (err) {
      setError('Google sign-up failed: ' + err.message);
    }
  };

  return (
    <div className='Login'>
      <div className='Login_Content'>
        <div className='Login_Logo'>
          <img 
            src="/images/aura.png" 
            alt="Logo" 
            className="Login_Icon" 
            style={{ width: '280px', height: '280px' }}
          />
        </div>

        <form onSubmit={signUp} className='Login_Input'>
          <input 
            type="email" 
            placeholder="Email Address" 
            className='Login_InputField' 
            ref={emailRef}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className='Login_InputField' 
            ref={passwordRef}
            required
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            className='Login_InputField' 
            ref={confirmPasswordRef}
            required
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className='Login_ButtonContainer'>
            <button className='Login_SubmitButton' type="submit">
              Sign Up
            </button>
          </div>
          
          <div className='Login_Text'>
            <p>or continue with</p>
          </div>

          <div className='Login_Options'>
            <button className='Login_Button' onClick={handleGoogleSignUp}>
              <img 
                src="/images/Google.png" 
                alt="Google" 
                className="Login_Icon" 
                style={{ width: '30px', height: '30px' }}
              />
            </button>
          </div>
        </form>

        <div className='Login_Text'>
          <p>
            <span className="gray-text">Already have an account? </span>
            <Link to="/sign-in" className="create-account-link">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
