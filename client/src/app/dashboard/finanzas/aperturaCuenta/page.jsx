'use client'
import React, { useState } from "react";
import Data from "./data";
import Attachment from "./attachment";

export default function PageAccount() {
  const [showData, setShowData] = useState(true);

  const handleNext = () => {
    setShowData(false);
  };

  const handleBack = () => {
    setShowData(true);
  };

  return (
    <div className="m-2 p-2">
      {showData ? (
        <Data handleNext={handleNext} />
      ) : (
        <Attachment handleBack={handleBack} />
      )}
    </div>
  );
}
