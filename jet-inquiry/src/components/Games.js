import React from 'react'
import './Games.css'
import { NavLink } from 'react-router-dom'

function Games() {
  return (
    <div classsName="Games">
        <div className='Games_Content'>
            <NavLink to="/scratch " className='Game_Card'>
                <h2>Raspe e realize</h2>
            </NavLink>
            <NavLink to="/dices" className='Game_Card'>
                <h2>Dados que mandam</h2>
            </NavLink>
            <NavLink to="/wheel" className='Game_Card'>
                <h2>Roleta da Putaria</h2>
            </NavLink>
        </div>
      
    </div>
  )
}

export default Games
