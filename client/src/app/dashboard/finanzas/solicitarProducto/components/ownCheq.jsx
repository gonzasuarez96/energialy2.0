"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  displayFailedMessage,
  displaySuccessMessage,
} from "@/app/components/Toastify";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

export default function OwnCheq() {
  // Estados Locales
  const companyId = useSelector((state) => state.user.userData.company.id);
  const [bankAccountId, setBankAccountId] = useState("");
  const [envioExitoso, setEnvioExitoso] = useState(false);
  const [error, setError] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [docType, setDocType] = useState("");
  const [dni, setDni] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [beneficiaryDocType, setBeneficiaryDocType] = useState("");
  const [beneficiaryDni, setBeneficiaryDni] = useState("");
  const [paymentDate, setPaymentDate] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [concept, setConcept] = useState('');
  const [modo, setModo] = useState('');
  const [cheqType, setCheqType] = useState('');
  const [caracter, setCaracter] = useState('');
  
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:3001/companies/${companyId}`)
      .then((response) => response.json())
      .then((data) => setBankAccountId(data.bankAccount.id))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  

  const handleChange = (e) => {
    const { id, value } = e.target;
  
    switch (id) {
      case 'businessName':
        setBusinessName(value);
        break;
      case 'docType':
        setDocType(value);
        break;
      case 'dni':
        setDni(value);
        break;
      case 'beneficiaryName':
        setBeneficiaryName(value);
        break;
      case 'beneficiaryDocType':
        setBeneficiaryDocType(value);
        break;
      case 'beneficiaryDni':
        setBeneficiaryDni(value);
        break;
      case 'paymentDate':
        setPaymentDate(value);
        break;
      case 'totalAmount':
        setTotalAmount(value);
        break;
      case 'concept':
        setConcept(value);
        break;
      case 'modo':
        setModo(value);
        break;
      case 'cheqType':
        setCheqType(value);
        break;
      case 'caracter':
        setCaracter(value);
        break;
      default:
        break;
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const additionalData = {
      businessName,
      docType,
      dni,
      beneficiaryName,
      beneficiaryDocType,
      beneficiaryDni,
      paymentDate,
      totalAmount,
      concept,
      modo,
      cheqType,
      caracter,
    }
    const accountData = {
      productName: 'Cheques propios',
      bankAccountId,
      additionalData
    };
    if (
      !businessName

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
      displaySuccessMessage("Datos enviados con exito");
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
      <div>
        <label className="block mb-2 bg-[#f7f7f7] py-4 pl-7 mt-4 font-bold border-l-4 border-primary-500 text-left">
          Tus Datos
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
            <select
              id="docType"
              value={docType}
              onChange={handleChange}
              className="w-full px-3 py-3 font-bold text-lg border"
            >
              <option value="">Tipo de Documento</option>
              <option value="DNI">DNI</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
          </div>
          <div className="mt-4 text-left">
            <input
              type="text"
              id="dni"
              value={dni}
              placeholder="Numero"
              onChange={handleChange}
              className="w-full px-3 py-3 font-bold text-lg border"
            />
          </div>
        </div>
        <label className="block mb-2 bg-[#f7f7f7] py-4 pl-7 mt-4 font-bold border-l-4 border-primary-500 text-left">
          Beneficiario del E-cheq
        </label>
        <div className="mt-4 text-left">
          <input
            type="text"
            id="beneficiaryName"
            value={beneficiaryName}
            placeholder="Nombre del beneficiario"
            onChange={handleChange}
            className="w-full px-3 py-3 font-bold text-lg border"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 text-left">
          <div className="mt-4 text-left">
            <select
              id="beneficiaryDocType"
              value={beneficiaryDocType}
              onChange={handleChange}
              className="w-full px-3 py-3 font-bold text-lg border"
            >
              <option value="">Tipo de Documento</option>
              <option value="DNI">DNI</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
          </div>
          <div className="mt-4 text-left">
            <input
              type="text"
              id="beneficiaryDni"
              value={beneficiaryDni}
              placeholder="Numero"
              onChange={handleChange}
              className="w-full px-3 py-3 font-bold text-lg border"
            />
          </div>
        </div>
        <label className="block mb-2 bg-[#f7f7f7] py-4 pl-7 mt-4 font-bold border-l-4 border-primary-500 text-left">
          E-cheq
        </label>
        <div className="grid grid-cols-2 gap-2 text-left">
          <div className="mt-4">
            <input
              type="date"
              id="paymentDate"
              value={paymentDate}
              onChange={handleChange}
              className="w-full px-3 py-3 font-bold text-lg border"
            />
          </div>
          <div className="mt-4">
            <input
              type="text"
              id="totalAmount"
              value={totalAmount}
              placeholder="Importe Total"
              onChange={handleChange}
              className="w-full px-3 py-3 font-bold text-lg border"
            />
          </div>
          <div className="mt-4">
            <select
              id="concept"
              value={concept}
              onChange={handleChange}
              className="w-full px-3 py-3 font-bold text-lg border"
            >
              <option value="">Concepto</option>
              <option value="varios">Varios</option>
              <option value="otros">Otros</option>
            </select>
          </div>
          <div className="mt-4">
            <input
              type="text"
              id="modo"
              value={modo}
              placeholder="Modo"
              onChange={handleChange}
              className="w-full px-3 py-3 font-bold text-lg border"
            />
          </div>
          <div className="mt-4">
            <select
              id="cheqType"
              value={cheqType}
              onChange={handleChange}
              className="w-full px-3 py-3 font-bold text-lg border"
            >
              <option value="">Tipo de Cheque</option>
              <option value="normal">Normal</option>
              <option value="diferido">Diferido</option>
            </select>
          </div>
          <div className="mt-4">
            <input
              type="text"
              id="caracter"
              value={caracter}
              placeholder="Caracter"
              onChange={handleChange}
              className="w-full px-3 py-3 font-bold text-lg border"
            />
          </div>
        </div>
        <div className="flex justify-end">
          {!envioExitoso && (
            <button
              className="px-10 py-2 m-4 font-bold text-white bg-[#191654] rounded hover:bg-secondary-600 transition duration-300"
              type="button"
              onClick={handleSubmit} // Al hacer clic en este botón, se ejecutará handleSubmit
            >
              Siguiente
            </button>
          )}
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
