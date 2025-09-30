import React, { useState } from 'react';
import '../screens/LoginScreen.css';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); 
    } catch (error) {
      alert(error.message);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      alert('Google sign-in failed: ' + error.message);
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

        <form onSubmit={handleLogin}>
          <div className='Login_Input'>
            <input 
              type="email" 
              placeholder="Email Address" 
              className='Login_InputField' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              className='Login_InputField' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className='Login_ButtonContainer'>
            <button className='Login_SubmitButton' type="submit">
              Continue
            </button>
          </div>

        <div className='Login_Text'>
          <p>or continue with</p>
        </div>

          <div className='Login_Options'>
          <button className='Login_Button' onClick={handleGoogleLogin}>
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
            <span className="gray-text">Not a Member? </span>
            <Link to="/join-us" className="create-account-link">Join Us</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
