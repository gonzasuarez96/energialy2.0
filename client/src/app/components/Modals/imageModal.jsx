import React from "react";

const ModalImage = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
    <div className="max-w-lg w-full bg-white p-4 rounded-md shadow-lg">
      
      <img src={imageUrl} alt="Expanded" className="w-full h-auto max-h-[80vh] object-contain" />
      <button
        onClick={onClose}
        className="mt-4 mx-auto block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-800"
      >
        Cerrar
      </button>
    </div>
  </div>
  );
};

export default ModalImage;