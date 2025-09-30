import React, { useState, useEffect } from "react";
import "./TrialCountdown.css";

export default function TrialCountdown() {
  const TRIAL_HOURS = 24;
  const TRIAL_KEY = "trial_end_time";

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // Check if a trial end time exists in localStorage
    let trialEnd = localStorage.getItem(TRIAL_KEY);

    if (!trialEnd) {
      // Set trial end time 24 hours from now
      trialEnd = new Date().getTime() + TRIAL_HOURS * 60 * 60 * 1000;
      localStorage.setItem(TRIAL_KEY, trialEnd);
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = trialEnd - now;

      if (diff <= 0) {
        setTimeLeft(0);
        clearInterval(interval);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format milliseconds into HH:MM:SS
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`trial-countdown ${timeLeft === 0 ? "expired" : ""}`}>
      {timeLeft > 0 ? (
        <p>Seu trial termina em: {formatTime(timeLeft)}</p>
      ) : (
        <p>O trial acabou! Assine para continuar.</p>
      )}
    </div>
  );
}
