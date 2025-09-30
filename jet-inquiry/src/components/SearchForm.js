import React, { useState } from "react";
import "./Search.css";

const SearchForm = ({ onProceed }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [time, setTime] = useState(""); // HH:MM format

  const handleProceed = () => {
    if (!from || !to || !date || !time || !passengers) return;

    // Convert time to timestamp, rounding to nearest 5 minutes
    const [hours, minutes] = time.split(":").map(Number);
    let dateObj = new Date(date);
    dateObj.setHours(hours);
    dateObj.setMinutes(Math.round(minutes / 5) * 5);
    dateObj.setSeconds(0);
    dateObj.setMilliseconds(0);
    const timestamp = dateObj.toISOString();

    const searchData = { from, to, date, passengers, timestamp };

    if (onProceed) {
      onProceed(searchData);
    }
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)} />
        <input placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input
          type="time"
          value={time}
          step={300} // step 300s = 5 minutes
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="number"
          min="1"
          placeholder="Passengers"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
        />
        <button onClick={handleProceed}>Proceed</button>
      </div>
    </div>
  );
};

export default SearchForm;
