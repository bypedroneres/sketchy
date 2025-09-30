import React, { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../components/ScratchCard.css";
import MenuBar from "./MenuBar";

export default function ScratchCardScreen({
  coverImage,
  revealImage,
  width = 300,
  height = 300,
  revealThreshold = 0.6,
}) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState(null);
  const [finished, setFinished] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const scale = window.devicePixelRatio || 1;

    canvas.width = width * scale;
    canvas.height = height * scale;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(scale, scale);

    const img = new Image();
    img.src = coverImage;
    img.onload = () => {
      ctx.fillStyle = "#0c0c0c";
      ctx.fillRect(0, 0, width, height);

      ctx.drawImage(img, 0, 0, width, height);
    };
  }, [coverImage, width, height]);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const client = e.touches ? e.touches[0] : e;
    return { x: client.clientX - rect.left, y: client.clientY - rect.top };
  };

  const startScratch = (e) => {
    if (finished) return;
    setIsDrawing(true);
    setLastPoint(getPos(e));
  };

  const stopScratch = () => {
    if (finished) return;
    setIsDrawing(false);
    setLastPoint(null);
    checkReveal();
  };

  const scratch = (e) => {
    if (!isDrawing || finished) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e);

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.lineWidth = window.innerWidth < 768 ? 60 : 30;

    if (lastPoint) {
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }

    setLastPoint(pos);
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, width, height);
    let cleared = 0;

    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) cleared++;
    }

    const ratio = cleared / (width * height);
    if (ratio > revealThreshold) {
      setFinished(true);
      setTimeout(() => setFadeOut(true), 50);
    }
  };

  return (
    <div className="ScratchScreen">
      <div className="ScratchScreen_Content">


        {/* Scratch card container */}
        <div className="ScratchCard_Container">
          {/* Reveal image behind canvas */}
          <img
            src={revealImage}
            alt="Revealed"
            className="reveal-image"
            style={{ width: `${width}px`, height: `${height}px` }}
          />

          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className={`scratch-canvas ${fadeOut ? "fade-out" : ""}`}
            onMouseDown={startScratch}
            onMouseUp={stopScratch}
            onMouseMove={scratch}
            onMouseLeave={stopScratch}
            onTouchStart={startScratch}
            onTouchEnd={stopScratch}
            onTouchMove={scratch}
          />
        </div>

        {/* Buttons under scratch card */}
        <div className="MakingOutScreen_Buttons">
          <NavLink to="/making-out" className="Scratch_Button">
          Realizar
          </NavLink>
          <NavLink to="/dices" className="Dices_Button">
            Jogar os dados
          </NavLink>
        </div>
        <MenuBar />
      </div>
    </div>
  );
}
