"use client";
import React from "react";

const popup = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-11/12 max-w-4xl p-3 overflow-y-auto text-center bg-white rounded-lg cursor-move max-h-4/5">
        <button
          onClick={onClose}
          className="absolute text-2xl bg-transparent border-none cursor-pointer top-2 right-2"
        >
          X
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default popup;
