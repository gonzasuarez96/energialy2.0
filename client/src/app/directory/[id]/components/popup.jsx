"use client"
import React from 'react';
import Draggable from 'react-draggable';

const popup = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Draggable>
        <div className="relative w-11/12 max-w-3xl p-5 overflow-y-auto text-center bg-white rounded-lg cursor-move max-h-4/5">
          <button onClick={onClose} className="absolute text-2xl bg-transparent border-none cursor-pointer top-2 right-2">
            X
          </button>
          {children}
        </div>
      </Draggable>
    </div>
  );
};

export default popup;