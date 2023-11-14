"use client";
import React, { useState } from "react";
import axios from "axios";
import { displayFailedMessage, displaySuccessMessage } from "@/app/components/Toastify";
import { ToastContainer} from "react-toastify";
import { useRouter } from "next/navigation";
import { useGetCompaniesByIdQuery } from "@/app/redux/services/companiesApi";
import getLocalStorage from "@/app/Func/localStorage";


export default function GarantLoan() {
      // Estados Locales
  const {company} = getLocalStorage();
  const [error, setError] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [fiscalAdress, setFiscalAdress] = useState("");
  const [cuit, setCuit] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [legalManager, setLegalManager] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    phoneNumber: "",
  });
  const [destination, setDestination] = useState("");
  const [amountToRequest, setAmountToRequest] = useState("")
  const [garantType, setGarantType] = useState("")
  const { data: userCompany, isLoading } = useGetCompaniesByIdQuery(company.id);
  const bankAccountId = userCompany?.bankAccount.id;

  const router = useRouter();

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
        case "fiscalAdress":
          setFiscalAdress(value);
          break;
        case "cuit":
          setCuit(value);
          break;
        case "companyEmail":
          setCompanyEmail(value);
          break;
        case "destination":
            setDestination(value);
            break;
        case "amountToRequest":
            setAmountToRequest(value);
            break;
        case "garantType":
            setGarantType(value);
            break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const additionalData = {
      businessName,
      fiscalAdress,
      cuit,
      companyEmail,
      legalManager,
      destination,
      amountToRequest,
      garantType,
    }
    const accountData = {
      productName: 'Préstamo con garantía',
      bankAccountId,
      additionalData
    };
    if (
      !businessName ||
      !fiscalAdress ||
      !cuit ||
      !companyEmail ||
      !legalManager ||
      !destination ||
      !amountToRequest ||
      !garantType
    ) {
      setError("Completa todos los campos");
      return;
    } else {
      setError("");
    }

    console.log("Información enviada:", accountData);
    try {
      const res = await axios.post(
        `http://localhost:3001/FinanceProducts`,
        accountData
      );
      console.log("resData server:", res);
      setEnvioExitoso(true);
      displaySuccessMessage('Datos enviados con exito')
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.log("errorData:", error);
      displayFailedMessage(error.response.data.error);
    }
  };
  return (
    <div>
      <label className="flex justify-center font-bold w-full p-4 mb-2 text-xl">Prestamo con Garantia</label>
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
              id="fiscalAdress"
              value={fiscalAdress}
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
            placeholder="Email"
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
        <label className="block mb-2 bg-[#f7f7f7] py-4 pl-7 mt-4 font-bold border-l-4 border-primary-500 text-left">
          Prestamo a sola firma
        </label>
        <div className="grid grid-cols-2 gap-2 text-left">
          <div className="mt-4 text-left">
            <input
              type="text"
              id="destination"
              value={destination}
              placeholder="Destino"
              onChange={handleChange}
              className="w-full px-3 py-3 font-bold text-lg border"
            />
          </div>
          <div className="mt-4 text-left">
            <input
              type="text"
              id="amountToRequest"
              value={amountToRequest}
              placeholder="Monto a solicitar"
              onChange={handleChange}
              className="w-full px-3 py-3 font-bold text-lg border"
            />
          </div>
        </div>
        <div className="mt-4 text-left">
          <input
            type="text"
            id="garantType"
            value={garantType}
            placeholder="Tipo de Garantia"
            onChange={handleChange}
            className="w-full px-3 py-3 font-bold text-lg border"
          />
        </div>
        <div className="flex justify-end">
            <button
              className="px-10 py-2 m-4 font-bold text-white bg-[#191654] rounded hover:bg-secondary-600 transition duration-300"
              type="button"
              onClick={handleSubmit} // Al hacer clic en este botón, se ejecutará handleSubmit
            >
              Siguiente
            </button>
        </div>
        {error && (
          <div className="flex justify-center text-danger mt-2 mb-2">
            {error}
          </div>
        )}
      </div>
      <ToastContainer style={{ marginTop: "100px" }} />
    </div>
  );
}
