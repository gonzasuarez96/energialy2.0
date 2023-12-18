"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../components/Nav";
import EditCompany from "./components/EditCompany";
import DatosBasicos from "./components/DatosBasicos";
import DetallesEmpresa from "./components/DetallesEmpresa";
import TipoOrganizacion from "./components/TipoOrganizacion";
import Imagenes from "./components/Imagenes";
import Suscripciones from "./components/Suscripciones";

const optionsNav = [
  "Datos Básicos",
  "Detalles de la Empresa",
  "Tipo de Organización",
  "Imágenes",
  "Suscripciones"
];

function pageProfileCompany() {
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
        {selectedOption === 0 && <DatosBasicos />}
        {selectedOption === 1 && <DetallesEmpresa />}
        {selectedOption === 2 && <TipoOrganizacion />}
        {selectedOption === 3 && <Imagenes />}
        {selectedOption === 4 && <Suscripciones />}
      </div>
    </div>
  );
}

export default pageProfileCompany;
