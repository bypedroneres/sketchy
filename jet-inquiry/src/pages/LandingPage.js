import React from "react";
import "./Landing.css";
import { NavLink } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing-container">
      {/* Top Nav / Botão */}
      <div className="landing-topbar">
          <img 
            src="/images/aura.png" 
            alt="Logo" 
            className="Login_Icon" 
            style={{ width: '2rem', height: '2rem' }}
          />
        <div className="logo">Sketchy</div>
      </div>

      {/* Seção Hero */}
      <div className="hero-section">
        <div className="small-text">Totalmente Gratis</div>
        <div className="hero-text">
          <h1 className="hero-title">Mergulhe no Mundo de Aventuras Divertidas!</h1>
          <p className="hero-subtext">
            Teste o aplicativo de maneira gratuita e descubra como ele pode
            apimentar seus momentos a dois.
          </p>
          <NavLink to="/home"className="cta-button">Comece Agora</NavLink>
        </div>

        {/* Mockup do Celular */}
        <div className="hero-image">
          <img src="/images/mockup.png" alt="Prévia do App" />
        </div>

        {/* Avatares flutuantes */}
        <img src="/images/avatars/avatar1.png" alt="Usuário 1" className="avatar avatar1" />
        <img src="/images/avatars/avatar2.png" alt="Usuário 2" className="avatar avatar2" />
        <img src="/images/avatars/avatar3.png" alt="Usuário 3" className="avatar avatar3" />
        <img src="/images/avatars/avatar4.png" alt="Usuário 4" className="avatar avatar4" />
      </div>
    </div>
  );
};

export default Landing;
