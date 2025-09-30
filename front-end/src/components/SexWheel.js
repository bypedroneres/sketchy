import React, { useState } from "react";
import "./SexWheel.css";

const slices = [
  "Action 1",
  "Action 2",
  "Action 3",
  "Action 4",
  "Action 5",
  "Action 6",
  "Action 7",
  "Action 8"
];

export default function Wheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const spins = 360 * (3 + Math.floor(Math.random() * 3)); // 3–5 full spins
    const offset = Math.floor(Math.random() * 360); // random extra rotation
    const totalRotation = rotation + spins + offset;
    setRotation(totalRotation);

    const sliceCount = slices.length;
    const degreesPerSlice = 360 / sliceCount;
    const finalAngle = (360 - (totalRotation % 360)) % 360;
    const selectedIndex = Math.floor(finalAngle / degreesPerSlice);

    setTimeout(() => {
      setResult(slices[selectedIndex]);
      setSpinning(false);
    }, 4000);
  };

  return (
    <div className="wheel-container">
      <div className="wheel-wrapper">
        <div className="wheel" style={{ transform: `rotate(${rotation}deg)` }}>
          {slices.map((label, i) => {
            const rotate = (360 / slices.length) * i;
            return (
              <div
                key={i}
                className="wheel-slice"
                style={{ transform: `rotate(${rotate}deg)` }}
              >
                <span>{label}</span>
              </div>
            );
          })}
        </div>
        <div className="wheel-pointer">▼</div>
      </div>

      {result && <div className="spin-result">🎯 Result: {result}</div>}

      <button className="spin-button" onClick={spin}>
        {spinning ? "Spinning..." : "Spin"}
      </button>
    </div>
  );
}
