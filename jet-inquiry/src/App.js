import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import MakingOutScreen from "./screens/MakingOutScreen";
import SyncPage from "./pages/SyncPage";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import Dashboard from "./screens/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import HomeScreen from "./screens/HomeScreen";

import { auth } from "./firebase";
import './styles/global.css';
import SettingsScreen from "./screens/SettingsScreen";
import DiceScreen from "./screens/DiceScreen";
import ScratchScreen from "./screens/ScratchScreen";
import Landing from "./pages/LandingPage"; // <-- import landing
import SexWheelScreen from "./screens/SexWheelScreen";

function App() {
  const [user, setUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  if (!isAuthChecked) return null;

  return (
    <Router>
      <Routes>
        {/* Root: public landing if not logged in, else dashboard */}
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Landing />}
        />

        {/* Public / marketing page */}
        <Route path="/landing-page" element={<Landing />} />
        <Route path="/home" element={<HomeScreen />} />

        {/* Authentication screens */}
        <Route path="/sign-in" element={<LoginScreen />} />
        <Route path="/join-us" element={<SignUpScreen />} />

        {/* App pages */}
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/dices" element={<DiceScreen />} />
        <Route path="/making-out" element={<MakingOutScreen />} />
        <Route path="/scratch" element={<ScratchScreen />} />
        <Route path="/wheel" element={<SexWheelScreen />} />
        <Route path="/sync/:inviterId" element={<SyncPage />} />

        {/* Dashboard protected */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute user={user}>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
