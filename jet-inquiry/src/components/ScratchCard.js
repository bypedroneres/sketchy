import React, { useRef, useEffect, useState } from "react";
import "../components/ScratchCard.css";

export default function ScratchCard({
  coverImage,
  revealImage,
  width = 300,
  height = 200,
  revealThreshold = 0.6,
  coverScale = 1.2, // scale factor for bigger cover image
}) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState(null);
  const [finished, setFinished] = useState(false);

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
      ctx.clearRect(0, 0, width, height);

      // Draw bigger than canvas for extra coverage
      const w = width * coverScale;
      const h = height * coverScale;
      const x = (width - w) / 2;
      const y = (height - h) / 2;

      ctx.drawImage(img, x, y, w, h);
    };
  }, [coverImage, width, height, coverScale]);

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
    const isMobile = window.innerWidth < 768;
    ctx.lineWidth = isMobile ? 60 : 30;

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
    if (ratio > revealThreshold) setFinished(true);
  };

  return (
    <div className="scratch-card-container" style={{ width, height }}>
      <img src={revealImage} alt="Revealed" className="reveal-image" />

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={`scratch-canvas ${finished ? "finished" : ""}`}
        onMouseDown={startScratch}
        onMouseUp={stopScratch}
        onMouseMove={scratch}
        onMouseLeave={stopScratch}
        onTouchStart={startScratch}
        onTouchEnd={stopScratch}
        onTouchMove={scratch}
      />

      <div className={`scratch-card-message ${finished ? "show" : ""}`}>
        aproveite o momento
      </div>
    </div>
  );
}
