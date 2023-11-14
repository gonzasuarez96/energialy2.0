"use client";
import React, { useEffect, useState } from "react";
import {
  displayFailedMessage,
  displaySuccessMessage,
} from "@/app/components/Toastify";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import getLocalStorage from "@/app/Func/localStorage";
import { useGetCompaniesByIdQuery } from "@/app/redux/services/companiesApi";


export default function FacturaCredito() {
  const router = useRouter();
  //----------Estados Locales ----------//
  const [user, setUser] = useState(null);
  const {company} = getLocalStorage();
  const [amount, setAmount] = useState(""); // Valor
  const [paymentTerm, setPaymentTerm] = useState(""); // Plazo de Pago Negociado
  const [invoiceIssuer, setInvoiceIssuer] = useState(""); // Emisor de la Factura
  const [invoiceTo, setInvoiceTo] = useState(""); // Factura Emitida A (booleano)
  const [issueDate, setIssueDate] = useState(""); // Fecha de Emisión de la Factura
  const [dueDate, setDueDate] = useState(""); // Fecha de Vencimiento de la Factura
  const [cuitIssuer, setCuitIssuer] = useState(""); // CUIT empresa emisora
  const [cuitRecived, setCuilRecived] = useState(""); // CUIT empresa receptora
  const [error, setError] = useState("");
  const { data: userCompany, isLoading } = useGetCompaniesByIdQuery(company.id);
  const bankAccountId = userCompany?.bankAccount.id;

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
        setInvoiceTo(value);
        break;
      case "issueDate":
        setIssueDate(value);
        break;
      case "dueDate":
        setDueDate(value);
        break;
      case "cuitIssuer":
        setCuitIssuer(value);
        break;
      case "cuitRecived":
        setCuilRecived(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const additionalData = {
      amount: amount,
      paymentTerm: paymentTerm,
      invoiceIssuer: invoiceIssuer,
      invoiceTo: invoiceTo,
      issueDate: issueDate,
      dueDate: dueDate,
      cuitIssuer: cuitIssuer,
      cuitRecived: cuitRecived
    };

    const accountData = {
      productName: 'Factura de crédito electrónica',
      bankAccountId,
      additionalData
    };

    if (
      !amount ||
      !paymentTerm ||
      !invoiceIssuer ||
      !issueDate ||
      !dueDate ||
      !cuitIssuer
    ) {
      setError("Completa todos los campos por favor.");
      return;
    }
    console.log("Información enviada:", accountData);
    try {
      const response = await axios.post(
        "http://localhost:3001/financeProducts",
        accountData
      );
      console.log("Información enviada:", accountData);
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

  useEffect(() => {
    const user = getLocalStorage();
    setUser(user);
  },[])
  return (
   
   
      <div className="text-center">
        <h2 className="p-4 border-b-2 border-gray-300 font-bold">
          FINANCIAMIENTO PARA TU FACTURA DE CREDITO ELECTRONICA
        </h2>
        <div>
          <form className="p-4" onSubmit={handleSubmit}>
            <div>
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
              </div>
              <div className="grid grid-cols-2 gap-2 text-left">
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
              </div>
              <div className="grid grid-cols-2 gap-2 text-left">
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
                <div>
                  <label className="block p-2 font-bold">CUIT</label>
                  <input
                    type="text"
                    id="cuitIssuer"
                    value={cuitIssuer}
                    placeholder="Ej. 30-12345678-1"
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-lg rounded border"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-left">
                <div>
                  <label className="block p-2 font-bold">
                    Factura emitida a:
                  </label>
                  <input
                    type="text"
                    id="invoiceIssuer"
                    value={invoiceIssuer}
                    placeholder="Nombre de la empresa"
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-lg rounded border"
                  />
                </div>
                <div>
                  <label className="block p-2 font-bold">CUIT</label>
                  <input
                    type="text"
                    id="cuitRecived"
                    value={cuitRecived}
                    placeholder="Ej. 20-12345678-1"
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-lg rounded border"
                  />
                </div>
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
          </form>
        </div>
        <ToastContainer style={{ marginTop: "100px" }} />
      </div>
  );
}
