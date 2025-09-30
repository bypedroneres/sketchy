import React from 'react'
import './MakingOutScreen.css'
import { NavLink } from 'react-router-dom'


function MakingOutScreen() {
  return (
    <div className='MakingOutScreen'>
      <div className='MakingOutScreen_Content'>
        <p>Aproveite o momento ...</p>
            <img 
            src="/images/aura.png" 
            alt="Logo" 
            className="MakingOut_Icon" 
            style={{ width: '280px', height: '280px' }}
          />
      <div className='MakingOutScreen_Buttons'>
        <NavLink to='/scratch' className="Scratch_Button">Queremos Foder</NavLink>
        <NavLink to='/dices' className="Dices_Button">Jogar os dados</NavLink>
      </div>
      </div>
    </div>
  )
}

export default MakingOutScreen
