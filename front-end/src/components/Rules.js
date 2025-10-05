import React, { useState } from "react";
import { Info } from "lucide-react"; // info icon
import "./Rules.css";

export default function Rules({ gameName, rulesText }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Fixed icon */}
      <div className="Rules_Icon" onClick={toggleModal}>
        <Info size={28} />
      </div>

      {/* Modal overlay */}
      {isOpen && (
        <div className="Rules_Modal" onClick={toggleModal}>
          <div
            className="Rules_Content"
            onClick={(e) => e.stopPropagation()} // clicking inside doesn't close
          >
            <h2>{gameName}</h2>
            <p>{rulesText}</p>
          </div>
        </div>
      )}
    </>
  );
}
