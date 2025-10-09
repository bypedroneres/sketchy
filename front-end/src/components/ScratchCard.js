import React, { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../components/ScratchCard.css";
import Rules from "./Rules";
import MenuBar from "./MenuBar";
import { Heart } from "lucide-react";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  collection,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function ScratchCardScreen({
  coverImage,
  width = 500,
  height = 500,
  revealThreshold = 0.6,
}) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState(null);
  const [finished, setFinished] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [isCoverLoaded, setIsCoverLoaded] = useState(false);
  const [isRevealLoaded, setIsRevealLoaded] = useState(false);
  const [revealImage, setRevealImage] = useState(null);

  // 🧠 Helper: both images must be loaded
  const isGameReady = isCoverLoaded && isRevealLoaded;

  // 🔥 Fetch random reveal image from Firestore
  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const db = getFirestore();
        const snapshot = await getDocs(collection(db, "positions"));

        if (!snapshot.empty) {
          const urls = snapshot.docs
            .map((doc) => doc.data().imageUrl)
            .filter(Boolean);

          if (urls.length > 0) {
            const randomIndex = Math.floor(Math.random() * urls.length);
            setRevealImage(urls[randomIndex]);
          }
        }
      } catch (err) {
        console.error("Error fetching positions:", err);
      }
    };

    fetchRandomImage();
  }, []);

  // 🧩 Load cover image into canvas
  useEffect(() => {
    if (!coverImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const scale = window.devicePixelRatio || 1;

    canvas.width = width * scale;
    canvas.height = height * scale;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(scale, scale);

    const img = new Image();

    img.onload = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      setIsCoverLoaded(true);
    };

    img.onerror = () => {
      console.error("Failed to load cover image:", coverImage);
    };

    img.src = coverImage;
  }, [coverImage, width, height]);

  // 🖼️ When reveal image fully loads
  useEffect(() => {
    if (!revealImage) return;
    const img = new Image();
    img.onload = () => setIsRevealLoaded(true);
    img.onerror = () => console.error("Failed to load reveal image:", revealImage);
    img.src = revealImage;
  }, [revealImage]);

  // 🖌️ Scratch logic
  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const client = e.touches ? e.touches[0] : e;
    return { x: client.clientX - rect.left, y: client.clientY - rect.top };
  };

  const startScratch = (e) => {
    if (!isGameReady || finished) return; // 🚫 guard
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
    if (!isGameReady || !isDrawing || finished) return;

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

  // 💖 Add to favorites
  const addToFavorites = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        alert("Você precisa estar logado para salvar favoritos.");
        return;
      }

      const db = getFirestore();
      const userDoc = doc(db, "users", user.uid);

      await updateDoc(userDoc, {
        favoritePositions: arrayUnion(revealImage),
      });

      alert("Adicionado aos favoritos!");
    } catch (error) {
      console.error("Erro ao salvar favorito:", error);
    }
  };

  return (
    <div className="ScratchScreen">
      <h1>Raspe e realize</h1>

      <div className="ScratchScreen_Content">
        <Rules
          gameName="Raspe e realize"
          rulesText={`1. Raspe com o dedo.\n2. Revele a posição escondida.\n3. Faça a posição com o seu parceiro (a).`}
        />

        <div className="ScratchCard_Container" style={{ position: "relative" }}>
          {/* 🖼️ Reveal image */}
          {revealImage && (
            <img
              src={revealImage}
              alt="Revealed"
              className="reveal-image"
              style={{
                width: `150px`,
                height: `150px`,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                zIndex: 1,
                objectFit: "cover",
                clipPath: "circle(50% at 50% 50%)",
              }}
            />
          )}

          {!isGameReady && (
            <div>
              
          
            </div>
          )}

          {/* 🎨 Scratch canvas */}
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
            style={{
              zIndex: 2,
              borderRadius: "50%",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: isGameReady ? "auto" : "none", // 🧠 no interaction early
            }}
          />
        </div>

        {/* 🔘 Buttons */}
        <div className="Scratch_Buttons">
          <NavLink to="/sex" className="Scratch_Button">
            Realizar
          </NavLink>
          <NavLink to="/dices" className="Dices_Button">
            Jogar os dados
          </NavLink>
          <div className="Fav_Button" onClick={addToFavorites}>
            <Heart size={20} />
          </div>
        </div>

        <MenuBar />
      </div>
    </div>
  );
}
