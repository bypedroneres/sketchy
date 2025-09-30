import React from 'react';
import { NavLink } from 'react-router-dom';
import './SexScreen.css';

export default function SexScreen() {

  const handleVibrate = () => {
    if (navigator.vibrate) {
      // Example pattern: vibrate 200ms, pause 100ms, vibrate 300ms
      navigator.vibrate([200, 100, 300, 100, 200]);
    }
  };

  return (
    <div className="SexScreen">
      <div className="SexScreen_Content">
        <h2>Aproveite o momento...</h2>
        <p>Escolha seu próximo movimento</p>

        <div className="SexScreen_Buttons">
          <NavLink to="/scratch" className="SexScreen_Button">
            Nova posição
          </NavLink>
          <button onClick={handleVibrate} className="SexScreen_Button">
            Vibrador
          </button>
        </div>
      </div>
    </div>
  );
}
