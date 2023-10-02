"use client";
import React, { useState, useEffect } from "react";
import {
  displayFailedMessage,
  displaySuccessMessage,
} from "@/app/components/Toastify";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import UploadthingButtonMany from "@/app/components/UploadthingButtonOnly";
import axios from 'axios'

export default function pageCredit() {
  const router = useRouter();
  //----------Estados Locales ----------//
  const [amount, setAmount] = useState(""); // Valor
  const [paymentTerm, setPaymentTerm] = useState(""); // Plazo de Pago Negociado
  const [invoiceIssuer, setInvoiceIssuer] = useState(""); // Emisor de la Factura
  const [invoiceTypeA, setInvoiceTypeA] = useState(false); // Factura Emitida A (booleano)
  const [issueDate, setIssueDate] = useState(""); // Fecha de Emisión de la Factura
  const [dueDate, setDueDate] = useState(""); // Fecha de Vencimiento de la Factura
  const [cuit, setCuit] = useState(""); // CUIT
  const [cuil, setCuil] = useState(""); // CUIL
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case "value":
        setAmount(value);
        break;
      case "paymentTerm":
        setPaymentTerm(value);
        break;
      case "invoiceIssuer":
        setInvoiceIssuer(value);
        break;
      case "invoiceTypeA":
        setInvoiceTypeA(e.target.checked);
        break;
      case "issueDate":
        setIssueDate(value);
        break;
      case "dueDate":
        setDueDate(value);
        break;
      case "cuit":
        setCuit(value);
        break;
      case "cuil":
        setCuil(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const creditData = {
      amount: amount,
      paymentTerm: paymentTerm,
      invoiceIssuer: invoiceIssuer,
      invoiceTypeA: invoiceTypeA,
      issueDate: issueDate,
      dueDate: dueDate,
      cuit: cuit,
      cuil: cuil,
    };

    if (
      !amount ||
      !paymentTerm ||
      !invoiceIssuer ||
      !issueDate ||
      !dueDate ||
      !cuit ||
      !cuil
    ) {
      setError("Completa todos los campos por favor.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/financeProducts",
        creditData
      );
      console.log("Información enviada:", creditData);
      console.log("Respuesta del servidor:", response.data);
      displaySuccessMessage("La solicitud se envió con éxito");
      setTimeout(() => {
        router.push("/directory");
      }, 2000);
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      displayFailedMessage("Hubo un error al enviar la solicitud");
    }
  };

  return (
    <main className="flex justify-center items-start w-full h-screen bg-white p-3 shadow overflow-y-auto">
      <div className="text-center">
        <h2 className="p-4 border-b-2 border-gray-300 font-bold">
          FINANCIAMIENTO PARA TU FACTURA DE CREDITO ELECTRONICA
        </h2>
        <div className="border-b-2 border-gray-300">
          <p className="mt-4 text-left">
            Al crear este proyecto de financiamiento, las empresas financieras
            podrán enviarte distintas tasas de descuento para que elijas la que
            mejor se ajuste a tu empresa.
          </p>
          <p className="text-left">
            Los datos del siguiente formulario son privados y no aparecerán en
            listados públicos. Únicamente las empresas financieras invitadas
            podrán enviarte una propuesta.
          </p>
        </div>
        <div>
          <form className="p-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-2 text-left">
              <div>
                <label className="block p-2 font-bold">
                  Valor (Indicar en pesos AR$ o en dólares U$D)
                </label>
                <input
                  type="text"
                  id="value"
                  value={amount}
                  placeholder="U$D"
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-lg rounded border"
                />
              </div>
              <div>
                <label className="block p-2 font-bold">
                  Plazo de Pago Negociado
                </label>
                <input
                  type="text"
                  id="paymentTerm"
                  value={paymentTerm}
                  placeholder="Ej. 30 días"
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-lg rounded border"
                />
              </div>
              <div>
                <label className="block p-2 font-bold">
                  Emisor de la Factura
                </label>
                <input
                  type="text"
                  id="invoiceIssuer"
                  value={invoiceIssuer}
                  placeholder="Nombre de la empresa emisora"
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-lg rounded border"
                />
              </div>
              <div className="flex">
                <label className="block p-2 font-bold">Factura Emitida A</label>
                <input
                  type="checkbox"
                  id="invoiceTypeA"
                  checked={invoiceTypeA}
                  onChange={(e) => setInvoiceTypeA(e.target.checked)}
                />
              </div>
              <div>
                <label className="block p-2 font-bold">
                  Fecha de Emisión de la Factura
                </label>
                <input
                  type="date"
                  id="issueDate"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full px-3 py-2 text-lg rounded border"
                />
              </div>
              <div>
                <label className="block p-2 font-bold">
                  Fecha de Vencimiento de la Factura
                </label>
                <input
                  type="date"
                  id="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 text-lg rounded border"
                />
              </div>
              <div>
                <label className="block p-2 font-bold">CUIT</label>
                <input
                  type="text"
                  id="cuit"
                  value={cuit}
                  placeholder="Ej. 30-12345678-1"
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-lg rounded border"
                />
              </div>
              <div>
                <label className="block p-2 font-bold">CUIL</label>
                <input
                  type="text"
                  id="cuil"
                  value={cuil}
                  placeholder="Ej. 20-12345678-1"
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-lg rounded border"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="px-4 py-2 m-4 font-bold text-white bg-[#191654] rounded hover:bg-secondary-600 transition duration-300"
                type="submit"
              >
                Solicitar
              </button>
            </div>
            {error && <div className="text-red-500">{error}</div>}
        <UploadthingButtonMany />
          </form>
        </div>
      </div>
      <ToastContainer style={{ marginTop: "100px" }} />
    </main>
  );
}
