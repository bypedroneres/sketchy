import React, { useState, useRef } from "react";
import "./Dice3DGame.css";
import { NavLink } from "react-router-dom";
import MenuBar from "./MenuBar";

// Lados dos dados para o jogo
const acoes = [
  "Beijo lento",
  "Tocar suavemente",
  "Lamber",
  "Massagear",
  "Cócegas delicadas",
  "Morder levemente"
];

const partes = [
  "Pescoço",
  "Lábios",
  "Coxa interna",
  "Peito",
  "Mãos",
  "Costas"
];


export default function Dice3DGame() {
  const [rollResult, setRollResult] = useState({ acao: 0, parte: 0 });
  const [rolling, setRolling] = useState(false);

  // Refs to the cubes
  const acaoCubeRef = useRef(null);
  const parteCubeRef = useRef(null);

  const rollDice = () => {
  if (rolling) return;
  setRolling(true);

  const acaoFace = Math.floor(Math.random() * 6);
  const parteFace = Math.floor(Math.random() * 6);

  // Slower, smoother rotation
  const randomRotation = (targetFace) => {
    const spinsX = 360 * (1 + Math.random() * 2); // 1–3 full spins
    const spinsY = 360 * (1 + Math.random() * 2);
    const spinsZ = 360 * (0.2 + Math.random() * 0.6); // subtle Z wobble

    const faceRotations = [
      [0, 0],
      [0, -90],
      [0, 90],
      [0, 180],
      [-90, 0],
      [90, 0],
    ];
    const [xOffset, yOffset] = faceRotations[targetFace];

    return `rotateX(${spinsX + xOffset}deg) rotateY(${spinsY + yOffset}deg) rotateZ(${spinsZ}deg)`;
  };

  if (acaoCubeRef.current) acaoCubeRef.current.style.transform = randomRotation(acaoFace);
  if (parteCubeRef.current) parteCubeRef.current.style.transform = randomRotation(parteFace);

  // After animation, snap to final face
  setTimeout(() => {
    setRollResult({ acao: acaoFace, parte: parteFace });

    if (acaoCubeRef.current) {
      const { x, y } = cubeRotation(acaoFace);
      acaoCubeRef.current.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
    }
    if (parteCubeRef.current) {
      const { x, y } = cubeRotation(parteFace);
      parteCubeRef.current.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
    }

    setRolling(false);
  }, 2000); // longer duration for sensual feel
};


  const cubeRotation = (faceIndex) => {
    const rotations = [
      { x: 0, y: 0 },       // frente
      { x: 0, y: -90 },     // direita
      { x: 0, y: 90 },      // esquerda
      { x: 0, y: 180 },     // trás
      { x: -90, y: 0 },     // topo
      { x: 90, y: 0 },      // fundo
    ];
    return rotations[faceIndex];
  };

  return (
    <div className="dice-container">
      <MenuBar />

      <div className="dice-wrapper" onClick={rollDice}>
        {/* Dado da ação */}
        <div
          ref={acaoCubeRef}
          className={`cube ${rolling ? "rolling" : ""}`}
          style={{
            transform: `rotateX(${cubeRotation(rollResult.acao).x}deg) rotateY(${cubeRotation(rollResult.acao).y}deg)`
          }}
        >
          {acoes.map((text, i) => (
            <div key={i} className={`face face${i + 1}`}>{text}</div>
          ))}
        </div>

        {/* Dado da parte do corpo */}
        <div
          ref={parteCubeRef}
          className={`cube ${rolling ? "rolling" : ""}`}
          style={{
            transform: `rotateX(${cubeRotation(rollResult.parte).x}deg) rotateY(${cubeRotation(rollResult.parte).y}deg)`
          }}
        >
          {partes.map((text, i) => (
            <div key={i} className={`face face${i + 1}`}>{text}</div>
          ))}
        </div>
      </div>

      <div className="buttons-container">
        <NavLink to="/making-out" className="makeout-button">Realizar</NavLink>
        <NavLink className="dice-button" onClick={rollDice}>Pular</NavLink>
      </div>
    </div>
  );
}
