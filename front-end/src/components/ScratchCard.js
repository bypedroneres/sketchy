import React, { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../components/ScratchCard.css";
import Rules from "./Rules";
import MenuBar from "./MenuBar";
import { Heart } from "lucide-react";
import { getFirestore, doc, updateDoc, arrayUnion, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function ScratchCardScreen({
  coverImage,
  width = 300,
  height = 300,
  revealThreshold = 0.6,
}) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState(null);
  const [finished, setFinished] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const [revealImage, setRevealImage] = useState(null);

  // 🔥 Fetch random image from Firestore
useEffect(() => {
  const fetchRandomImage = async () => {
    try {
      const db = getFirestore();
      const snapshot = await getDocs(collection(db, "positions"));

      if (!snapshot.empty) {
        // Collect all imageUrls into an array
        const urls = snapshot.docs
          .map((doc) => doc.data().imageUrl)
          .filter((url) => url); // remove undefined/null

        if (urls.length > 0) {
          // Pick one at random
          const randomIndex = Math.floor(Math.random() * urls.length);
          setRevealImage(urls[randomIndex]);
        } else {
          console.warn("No imageUrl fields found in positions docs");
          setRevealImage(null);
        }
      } else {
        console.warn("No documents found in positions collection");
        setRevealImage(null);
      }
    } catch (err) {
      console.error("Error fetching positions:", err);
      setRevealImage(null);
    }
  };

  fetchRandomImage();
}, []);


  // Initialize canvas (same as before)
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

  // Scratch functions stay the same
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

  // 🔥 Add to favorites in Firebase
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
      <div className="ScratchScreen_Content">
          <Rules
            gameName="Raspe e realize"
            rulesText={`1. Raspe com o dedo.
          2. Revele a posição escondida.
          3. Faça a posição com o seu parceiro (a)`}
          />
<div className="ScratchCard_Container" style={{ position: "relative" }}>
  {revealImage && (
    <>
      {/* Stronger black radial gradient */}
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          position: "absolute",
          top: 0,
          left: 0,
          borderRadius: "50%",
          background: `radial-gradient(circle, white 10%, black 80%, black 90%, black 100%)`,
          zIndex: 0,
          effects: "blur(20px)",
          pointerEvents: "none",
        }}
      />

      {/* Revealed image */}
      <img
        src={revealImage}
        alt="Revealed"
        className="reveal-image"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          position: "absolute",
          top: 0,
          left: 0,
          borderRadius: "50%",
          zIndex: 1,
          objectFit: "cover",
          clipPath: "circle(50% at 50% 50%)",
        }}
      />
    </>
  )}

  {/* Scratch canvas */}
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
    style={{ zIndex: 2, borderRadius: "50%" }}
  />
</div>

            
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
