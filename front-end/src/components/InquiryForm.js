import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";   // ⬅️ NEW
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./InquiryForm.css";

const InquiryForm = () => {
  const location = useLocation();                // ⬅️ NEW
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const prefill = location.state || {};          // ⬅️ NEW

  const [contact, setContact] = useState("");
  const [success, setSuccess] = useState("");
  const [flightInfo, setFlightInfo] = useState({
    from: "",
    to: "",
    date: "",
    passengers: 1,
    timestamp: "",
  });

  useEffect(() => {
    if (prefill) setFlightInfo(prefill);         // now it actually gets the data
  }, [prefill]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "inquiries"), {
        contact,
        ...flightInfo,
        createdAt: serverTimestamp(),
      });
      setSuccess("Request sent! Our team will contact you soon.");
      setContact("");
    } catch (err) {
      console.error("Firestore write error:", err);
      setSuccess("Error sending request. Check console.");
    }
  };

  const formattedTime = flightInfo.timestamp
    ? new Date(flightInfo.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="inquiry-container">
      <h1>Confirm Your Flight</h1>
      <div className="flight-summary">
        <p><strong>Route:</strong> {flightInfo.from} → {flightInfo.to}</p>
        <p><strong>Date:</strong> {flightInfo.date}</p>
        <p><strong>Time:</strong> {formattedTime}</p>
        <p><strong>Passengers:</strong> {flightInfo.passengers}</p>
      </div>

      <form className="inquiry-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Phone or Email"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <button type="submit">Submit Inquiry</button>
      </form>

      {success && <p className="success-msg">{success}</p>}
    </div>
  );
};

export default InquiryForm;
