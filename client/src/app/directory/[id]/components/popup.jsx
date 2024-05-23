import React from 'react';

function Popup ({ show, onClose, children }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-5 rounded-lg text-center w-11/12 max-w-3xl max-h-4/5 overflow-y-auto">
        <button onClick={onClose} className="absolute top-2 right-2 bg-transparent border-none text-2xl cursor-pointer">
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
