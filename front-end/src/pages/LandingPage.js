import React from "react";
import "./Landing.css";
import { NavLink } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing-container">
      {/* Top Nav */}
      <div className="landing-topbar">
        <img 
          src="/images/aura.png" 
          alt="Logo" 
          className="Login_Icon" 
          style={{ width: '2rem', height: '2rem' }}
        />
        <div className="logo">Sketchy</div>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-text">
          <h1 className="hero-title">Explore, excite-se e viva o prazer sem limites</h1>
          <p className="hero-subtext">
            Não importa se você é solteiro, ficante ou casal — são 2 jogos sexuais exclusivos, 
            aprovados por atores e atrizes pornô, que vão levar seu prazer ao máximo.
          </p>
          <NavLink to="/home" className="cta-button">Acessar Aplicativo</NavLink>
        </div>
        <div className="hero-image">
          <img src="/images/mockup.png" alt="Prévia do App" />
        </div>
      </div>

      {/* Social Proof */}
      <section className="social-proof">
        <h2>Porque milhares de pessoas estão usando...</h2>
        <p>⭐️⭐️⭐️⭐️⭐️ Avaliado em <span className="verify">Verificar</span></p>
        <div className="proof-cards">
          <div className="proof-card">
            <h3>🔥 Fogo Total</h3>
            <p>Transforme cada momento a dois em pura tentação.</p>
          </div>
          <div className="proof-card">
            <h3>💦 Prazer Sem Limites</h3>
            <p>Jogos eróticos que vão elevar sua vontade ao extremo.</p>
          </div>
          <div className="proof-card">
            <h3>😈 Ouse Mais</h3>
            <p>Descubra e viva suas fantasias mais secretas.</p>
          </div>
          <div className="proof-card">
            <h3>💋 Domine a Arte do Sexo</h3>
            <p>Aprenda truques profissionais para experiências inesquecíveis.</p>
          </div>
        </div>
        <NavLink to="/home" className="cta-button">Acessar Aplicativo</NavLink>
      </section>

      {/* Erotic Games Section */}
      <section className="games-section">
        <h2>O jogo que faz cada momento juntos inesquecível</h2>
        <p>⭐️⭐️⭐️⭐️⭐️ Avaliado em <span className="verify">Verificar</span></p>

        <div className="game">
          <h3>🔥 Raspe e Realize</h3>
          <p>
            Desafie seus limites: viva posições sexuais inéditas, explore lugares excitantes e desbloqueie recompensas a cada desafio completado.
          </p>
        </div>

        <div className="game">
          <h3>🎲 Os Dados que Mandam</h3>
          <p>
            Gire os dados e deixe o prazer comandar. Um define a ação, o outro escolhe a parte do corpo — e a diversão vai ao extremo.
          </p>
        </div>

        <p className="offer-text">
          Desbloqueie seu acesso ao aplicativo por apenas <strong>R$10,90</strong> ou em até 12x de R$!
          <br />Explore mais de 500 posições sexuais e experiências inéditas, locais excitantes e extras quentes.
        </p>

        <ul className="bonus-list">
          <li>🔥 Desafios secretos para dias, tardes e noites inesquecíveis</li>
          <li>💦 Técnicas de especialistas para orgasmos intensos</li>
          <li>🎁 Extras surpresa que vão elevar seu prazer</li>
          <li>🏆 Sistema de recompensas para experiências ainda mais ousadas</li>
        </ul>

        <NavLink to="/home" className="cta-button big">Ter acesso agora mesmo</NavLink>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>O que milhares de pessoas estão comentando...</h2>
        <p>⭐️⭐️⭐️⭐️⭐️ Avaliado em <span className="verify">Verificar</span></p>
        <div className="testimonial-text">
          Este jogo vai transformar sua vida sexual — aumente a satisfação, intensifique os encontros e descubra novas sensações.
          Melhore a comunicação, ganhe confiança e alivie o estresse de forma divertida e excitante.
        </div>
        <NavLink to="/home" className="cta-button">Acessar Aplicativo</NavLink>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>Sobre nós</h2>
        <p>
          Criado em 2024, direto de Amsterdã, este jogo leva você e seu parceiro(a) a uma experiência intensa de intimidade e prazer.
          Feito para casais, solteiros, ficantes que querem explorar, se divertir e descobrir novas sensações.
          Ele vai transformar cada momento a dois em algo inesquecível.
        </p>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <h2>Principais dúvidas</h2>
        <div className="faq-item">
          <h4>É apenas para casais?</h4>
          <p>Não! O app é para ficantes, primeiro encontro, namorados, casados — todo mundo pode se divertir.</p>
        </div>
        <div className="faq-item">
          <h4>Como baixar o app?</h4>
          <p>Efetue o pagamento da taxa única e receba o link para baixar o app diretamente no seu celular e começar a usar ainda hoje.</p>
        </div>
        <div className="faq-item">
          <h4>É adequado para todas as orientações sexuais?</h4>
          <p>Atualmente apenas para heterossexuais, mas novas versões estão a caminho para outras orientações.</p>
        </div>
        <div className="faq-item">
          <h4>Ajuda a sair da rotina?</h4>
          <p>
            Sim — principalmente se você faz sempre o mesmo! Chegou a hora de esquentar, inovar e sentir o máximo dos prazeres.
          </p>
        </div>
        <div className="faq-item">
          <h4>Quais jogos estão disponíveis?</h4>
          <p>
            Atualmente 2 jogos exclusivos: <strong>Raspe e Realize</strong> e <strong>Os Dados que Mandam</strong> — e novos chegando em breve.
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="footer">
        <NavLink to="/home" className="cta-button big">Comprar acesso agora mesmo</NavLink>
        <p>⭐️⭐️⭐️⭐️⭐️ Avaliado em <span className="verify">Verificar</span></p>
      </footer>
    </div>
  );
};

export default Landing;
