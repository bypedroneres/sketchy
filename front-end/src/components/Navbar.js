import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="Navbar">
      <NavLink to="/dashboard" className="nav-link" end>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-label="Home">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      </NavLink>
      <NavLink to="/settings" className="nav-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-label="Settings">
          <path d="M19.43 12.98c.04-.32.07-.66.07-1s-.03-.68-.07-1l2.11-1.65a.503.503 0 0 0 .12-.63l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1a6.992 6.992 0 0 0-1.73-1l-.38-2.65A.5.5 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.63.25-1.21.58-1.73 1l-2.49-1a.5.5 0 0 0-.61.22l-2 3.46c-.14.24-.08.55.12.63L4.57 10c-.04.32-.07.66-.07 1s.03.68.07 1l-2.11 1.65a.503.503 0 0 0-.12.63l2 3.46c.14.24.44.33.61.22l2.49-1c.52.42 1.1.76 1.73 1l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.63-.25 1.21-.58 1.73-1l2.49 1c.18.11.47.02.61-.22l2-3.46a.503.503 0 0 0-.12-.63l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
        </svg>
      </NavLink>
    </nav>
  );
}

export default Navbar;
