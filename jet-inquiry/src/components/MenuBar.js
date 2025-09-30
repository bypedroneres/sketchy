import React from 'react';
import { NavLink } from 'react-router-dom';
import './MenuBar.css';

function MenuBar() {
  return (
    <div className='MenuBar'>
      <div className='MenuBar_Content'>
        <NavLink to="/">
          <img
            src="/images/aura.png"
            alt="Menu"
            className='MenuBar_Icon'
          />
        </NavLink>
      </div>
    </div>
  );
}

export default MenuBar;
