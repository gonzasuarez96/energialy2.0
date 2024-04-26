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
import { urlProduction } from "@/app/data/dataGeneric";

export default function FacturaCredito() {
  const router = useRouter();
  //----------Estados Locales ----------//
  const [user, setUser] = useState(null);
  const { company } = getLocalStorage();
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
  const bankAccountId = userCompany?.bankAccount?.id;
  const [currency, setCurrency] = useState("AR$");

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
      case "invoiceTo":
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
      case "currency":
        setCurrency(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const additionalData = {
      amount: `${amount} ${currency}`,
      paymentTerm: `${paymentTerm} Días`,
      invoiceIssuer: invoiceIssuer,
      invoiceTo: invoiceTo,
      issueDate: issueDate,
      dueDate: dueDate,
      cuitIssuer: cuitIssuer,
      cuitRecived: cuitRecived,
    };

    const accountData = {
      productName: "Factura de crédito electrónica",
      bankAccountId,
      additionalData,
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
        `${urlProduction}/financeProducts`,
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
  }, []);
  return (
    <div className="text-center">
      <h3 className="p-4 border-b-2 border-gray-300 font-bold">
        Financiamiento para tu Factura de Crédito Electrónica
      </h3>
      <div>
        <form className="p-4" onSubmit={handleSubmit}>
          <div>
            <div className="grid grid-cols-2 gap-2 text-left">
              <div>
                <label className="block mb-2 bg-[#f7f7f7] py-2 pl-2 mt-4 font-bold border-l-4 border-primary-500 text-left">
                  Valor (Indicar en pesos AR$ o en dólares U$D)
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="value"
                    value={amount}
                    placeholder={currency}
                    onChange={handleChange}
                    className="w-full px-3 py-3 font-bold text-lg border"
                  />
                  <select
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="px-3 py-3 border border-gray-300 rounded-r-md appearance-none"
                  >
                    <option value="AR$">AR$</option>
                    <option value="U$D">U$D</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block mb-2 bg-[#f7f7f7] py-2 pl-2 mt-4 font-bold border-l-4 border-primary-500 text-left">
                  Fecha de Emisión de la Factura
                </label>
                <input
                  type="date"
                  id="issueDate"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full px-3 py-3 font-bold text-lg border"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-left">
              <div>
                <label className="block mb-2 bg-[#f7f7f7] py-2 pl-2 mt-4 font-bold border-l-4 border-primary-500 text-left">
                  Plazo de Pago Negociado
                </label>
                <input
                  type="text"
                  id="paymentTerm"
                  value={paymentTerm}
                  placeholder="Ej. 30 días"
                  onChange={handleChange}
                  className="w-full px-3 py-3 font-bold text-lg border"
                />
              </div>
              <div>
                <label className="block mb-2 bg-[#f7f7f7] py-2 pl-2 mt-4 font-bold border-l-4 border-primary-500 text-left">
                  Fecha de Vencimiento de la Factura
                </label>
                <input
                  type="date"
                  id="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-3 font-bold text-lg border"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-left">
              <div>
                <label className="block mb-2 bg-[#f7f7f7] py-2 pl-2 mt-4 font-bold border-l-4 border-primary-500 text-left">
                  Emisor de la Factura
                </label>
                <input
                  type="text"
                  id="invoiceIssuer"
                  value={invoiceIssuer}
                  placeholder="Nombre de la empresa emisora"
                  onChange={handleChange}
                  className="w-full px-3 py-3 font-bold text-lg border"
                />
              </div>
              <div>
                <label className="block mb-2 bg-[#f7f7f7] py-2 pl-2 mt-4 font-bold border-l-4 border-primary-500 text-left">
                  CUIT
                </label>
                <input
                  type="text"
                  id="cuitIssuer"
                  value={cuitIssuer}
                  placeholder="Ej. 30-12345678-1"
                  onChange={handleChange}
                  className="w-full px-3 py-3 font-bold text-lg border"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-left">
              <div>
                <label className="block mb-2 bg-[#f7f7f7] py-2 pl-2 mt-4 font-bold border-l-4 border-primary-500 text-left">
                  Factura emitida a:
                </label>
                <input
                  type="text"
                  id="invoiceTo"
                  value={invoiceTo}
                  placeholder="Nombre de la empresa"
                  onChange={handleChange}
                  className="w-full px-3 py-3 font-bold text-lg border"
                />
              </div>
              <div>
                <label className="block mb-2 bg-[#f7f7f7] py-2 pl-2 mt-4 font-bold border-l-4 border-primary-500 text-left">
                  CUIT
                </label>
                <input
                  type="text"
                  id="cuitRecived"
                  value={cuitRecived}
                  placeholder="Ej. 20-12345678-1"
                  onChange={handleChange}
                  className="w-full px-3 py-3 font-bold text-lg border"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="px-10 py-2 m-4 font-bold text-white bg-[#191654] rounded hover:bg-secondary-600 transition duration-300"
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
