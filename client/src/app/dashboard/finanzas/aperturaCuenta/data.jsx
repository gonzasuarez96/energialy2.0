"use client";
import React, { useState } from "react";

export default function Data(props) {
  // Estados Locales
  const [businessName, setBusinessName] = useState("");
  const [fiscalAddress, setFiscalAddress] = useState("");
  const [cuit, setCuit] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [legalManager, setLegalManager] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "legalManager") {
      setLegalManager({
        ...legalManager,
        [e.target.name]: value,
      });
    } else {
      switch (id) {
        case "businessName":
          setBusinessName(value);
          break;
        case "fiscalAddress":
          setFiscalAddress(value);
          break;
        case "cuit":
          setCuit(value);
          break;
        case "companyEmail":
          setCompanyEmail(value);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const accountData = {
      businessName,
      fiscalAddress,
      cuit,
      companyEmail,
      legalManager,
    };

    console.log("Información enviada:", accountData);
    // Agregar aquí la lógica para enviar los datos al servidor
  };

  return (
    <main className="flex justify-center items-start w-full h-screen bg-white p-3 shadow overflow-y-auto">
      <div className="w-full text-center">
        <h2 className="p-4 border-b-2 border-gray-300 font-bold">
          Solicitud de Apertura de Cuenta
        </h2>
        <div>
          <label className="block mb-2 bg-[#f7f7f7] py-4 pl-7 mt-4 font-bold border-l-4 border-primary-500 text-left">
            Tu Empresa
          </label>
          <div className="mt-4 text-left">
            <input
              type="text"
              id="businessName"
              value={businessName}
              placeholder="Nombre/Razón Social"
              onChange={handleChange}
              className="w-full px-3 py-3 font-bold text-lg border"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="mt-4 text-left">
              <input
                type="text"
                id="fiscalAddress"
                value={fiscalAddress}
                placeholder="Dirección Fiscal"
                onChange={handleChange}
                className="w-full px-3 py-3 font-bold text-lg border"
              />
            </div>
            <div className="mt-4 text-left">
              <input
                type="text"
                id="cuit"
                value={cuit}
                placeholder="CUIT"
                onChange={handleChange}
                className="w-full px-3 py-3 font-bold text-lg border"
              />
            </div>
          </div>
          <div className="mt-4 text-left">
            <input
              type="email"
              id="companyEmail"
              value={companyEmail}
              placeholder="Email de la Empresa"
              onChange={handleChange}
              className="w-full px-3 py-3 font-bold text-lg border"
            />
          </div>
          <label className="block mb-2 bg-[#f7f7f7] py-4 pl-7 mt-4 font-bold border-l-4 border-primary-500 text-left">
            Responsable Legal de la Empresa
          </label>
          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="mt-4 text-left">
              <input
                type="text"
                id="legalManager"
                name="firstName"
                value={legalManager.firstName}
                placeholder="Nombre"
                onChange={handleChange}
                className="w-full px-3 py-3 font-bold text-lg border"
              />
            </div>
            <div className="mt-4 text-left">
              <input
                type="text"
                id="legalManager"
                name="lastName"
                value={legalManager.lastName}
                placeholder="Apellido"
                onChange={handleChange}
                className="w-full px-3 py-3 font-bold text-lg border"
              />
            </div>
          </div>
          <div className="mt-4 text-left">
            <input
              type="email"
              id="legalManager"
              name="email"
              value={legalManager.email}
              placeholder="Correo"
              onChange={handleChange}
              className="w-full px-3 py-3 font-bold text-lg border"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="mt-4 text-left">
              <input
                type="text"
                id="legalManager"
                name="position"
                value={legalManager.position}
                placeholder="Puesto Laboral"
                onChange={handleChange}
                className="w-full px-3 py-3 font-bold text-lg border"
              />
            </div>
            <div className="mt-4 text-left">
              <input
                type="text"
                id="legalManager"
                name="phoneNumber"
                value={legalManager.phoneNumber}
                placeholder="Teléfono"
                onChange={handleChange}
                className="w-full px-3 py-3 font-bold text-lg border"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="px-4 py-2 m-4 font-bold text-white bg-[#191654] rounded hover:bg-secondary-600 transition duration-300"
              type="button"
              onClick={props.handleNext}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
      {/* ToastContainer y UploadthingButton van aquí si es necesario */}
    </main>
  );
}