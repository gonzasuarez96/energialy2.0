"use client";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../components/Nav";
import MisImagenes from "./components/MisImagenes";
import AgregarImagen from "./components/AgregarImagen";

const optionsNav = [
  "Mis Productos/Servicios",
  "Agregar Productos/Servicios",
];

function pageProfileGallery() {
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptions = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="w-full h-100 bg-white flex ml-4 shadow">
      <div className="w-1/4">
        <Nav options={optionsNav} onClick={handleOptions} />
      </div>
      <div className="flex-1">
        {selectedOption === 0 && <MisImagenes />}
        {selectedOption === 1 && <AgregarImagen />}    
      </div>
    </div>
  );
}

export default pageProfileGallery;
