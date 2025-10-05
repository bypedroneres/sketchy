import React from 'react';
import { NavLink } from 'react-router-dom';
import './SexScreen.css';

export default function SexScreen() {

  return (
    <div className="SexScreen">
      <div className='MakingOutScreen_Content'>
        <p>Aproveite o momento ...</p>
            <img 
            src="/images/aura.png" 
            alt="Logo" 
            className="MakingOut_Icon" 
            style={{ width: '280px', height: '280px' }}
          />
      <div className='MakingOutScreen_Buttons'>
        <NavLink to='/scratch' className="Scratch_Button">Trocar de posicao</NavLink>
        <NavLink to='/dices' className="Dices_Button">Jogar os dados</NavLink>
      </div>
      </div>
    </div>
  );
}
