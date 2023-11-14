"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../components/Nav";
import EditCompany from "./components/EditCompany";

const optionsNav = [
  "Datos Básicos",
  "Detalles de la Empresa",
  "Tipo de Organización",
  "Imágenes",
];

function pageProfileCompany() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptions = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="w-full h-100 bg-white flex ml-4 shadow">
      <div className="w-1/4">
        <Nav options={optionsNav} onClick={handleOptions} />
      </div>
      <div className="flex-1">
        <EditCompany option={selectedOption} />
      </div>
    </div>
  );
}

export default pageProfileCompany;
