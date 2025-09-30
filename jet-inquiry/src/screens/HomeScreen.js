import React from 'react';
import './HomeScreen.css';

function HomeScreen() {


  return (
    <div className='Home'>
      <div className='Home_Content'>
        <div className='Home_Text'>
          <h1>Explore, excite-se e viva o prazer sem limites.</h1>
        </div>
        <div className='Home_Logo'>
          <img 
            src="/images/aura.png" 
            alt="Logo" 
            className="Home_Icon" 
            style={{ width: '280px', height: '280px' }}
          />
        </div>



        <div className='Home_Buttons'>
          <a href="/sign-in" className='Sign_Button'>Começar a brincadeira</a>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
