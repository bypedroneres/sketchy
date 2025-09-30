import React, { useState } from "react";
import "./SexWheel.css";

const actions = [
  "Action 1",
  "Action 2",
  "Action 3",
  "Action 4",
  "Action 5",
  "Action 6",
  "Action 7",
  "Action 8"
];

export default function SexWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const spins = 360 * (3 + Math.floor(Math.random() * 3));
    const randomOffset = Math.floor(Math.random() * 360);
    const totalRotation = rotation + spins + randomOffset;
    setRotation(totalRotation);

    const segments = actions.length;
    const degreesPerSegment = 360 / segments;
    const finalAngle = totalRotation % 360;
    const selectedIndex = Math.floor((segments - finalAngle / degreesPerSegment) % segments);

    setTimeout(() => {
      setResult(actions[selectedIndex]);
      setSpinning(false);
    }, 4000);
  };

  return (
    <div className="wheel-container">
      <div className="wheel-wrapper">
        <div
          className={`wheel ${spinning ? "spinning" : ""}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {actions.map((label, i) => {
            const rotate = (360 / actions.length) * i;
            return (
              <div
                key={i}
                className="wheel-segment"
                style={{ transform: `rotate(${rotate}deg)` }}
              >
                <span>{label}</span>
              </div>
            );
          })}
        </div>
        <div className="wheel-indicator">▼</div>
      </div>

      {result && (
        <div className="spin-result" style={{ zIndex: 1 }}>
          🎯 Result: <span>{result}</span>
        </div>
      )}

      <div className="buttons-container">
        <button className="wheel-button" onClick={spinWheel}>
          {spinning ? "Spinning..." : "Spin"}
        </button>
      </div>
    </div>
  );
}
