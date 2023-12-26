"use client";
import React, { useState, useEffect } from "react";
import { Montserrat } from "next/font/google";
import axios from "axios";
import {
  displayFailedMessage,
  displaySuccessMessage,
} from "../../../components/Toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import getLocalStorage from "@/app/Func/localStorage";
import { urlProduction } from "@/app/data/dataGeneric";
import { useGetCompaniesByIdQuery } from "@/app/redux/services/companiesApi";

const annualRevenueOptions = [
  "No Revelado",
  "0 - 10M U$S",
  "10M - 100M U$D",
  "100M - 1B U$S",
  "+1B U$S",
];

const employeeCountOptions = [
  "Menos de 50 empleados",
  "De 50 a 200 empleados",
  "De 200 a 1000 empleados",
  "De 1000 a 5000 empleados",
  "Mas de 5000 empleados",
];

const organizationTypes = [
  "Organismo Público",
  "Operadora",
  "PyME",
  "Cámara/Cluster/Federación",
  "Profesional independiente",
  "Servicios especiales",
];

export default function DetallesEmpresa() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const { data: companyInfo, isLoading } = useGetCompaniesByIdQuery(
    user?.company.id
  );
  console.log("companyData:", companyInfo);
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [organizationType, setOrganizationType] = useState("");

  const [isEdited, setIsEdited] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const user = getLocalStorage();
      setUser(user);

      if (companyInfo) {
        setCompanyData(companyInfo);
        setAnnualRevenue(companyInfo.annualRevenue || "");
        setEmployeeCount(companyInfo.employeeCount || "");
        setOrganizationType(companyInfo.organizationType || "");
      }
    };
    fetchData();
  }, [companyInfo]);

  const handleInputChange = (e, field) => {
    const value = e.target.value;

    // Verificar si se ha realizado una edición
    if (value !== user[field]) {
      setIsEdited(true);
    } else {
      setIsEdited(false);
    }

    // Actualizar el estado local
    handleFieldUpdate(field, value);
  };

  const handleFieldUpdate = (field, value) => {
    switch (field) {
      case "annualRevenue":
        setAnnualRevenue(value);
        break;
      case "employeeCount":
        setEmployeeCount(value);
        break;
      case "organizationType":
        setOrganizationType(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEdited) {
      setSubmitError("Debes realizar alguna modificacion.");
      return;
    }
    const updatedData = {};

    if (organizationType.trim() !== "") {
      updatedData.organizationType = organizationType.trim();
    }
    if (annualRevenue.trim() !== "") {
      updatedData.annualRevenue = annualRevenue.trim();
    }
    if (employeeCount.trim() !== "") {
      updatedData.employeeCount = employeeCount.trim();
    }

    updatedData.id = user.company.id;

    console.log("Datos enviados:", updatedData);
    try {
      const response = await axios.put(
        `${urlProduction}/companies/${user.company.id}`,
        updatedData
      );
      displaySuccessMessage("Cambios guardados con éxito");
      console.log("Datos actualizados: ", response);
      const companyDetails = response.data;
      setTimeout(() => {
        router.push("/dashboard/");
      }, 2000);
      // Aquí puedes realizar las acciones necesarias con la respuesta del servidor
      // Por ejemplo, actualizar el estado global o realizar redireccionamientos
    } catch (error) {
      console.log("Error al actualizar datos: ", error);
      displayFailedMessage(error.response);
    }
  };

  return (
    <div className="p-5 m-2">
      <div>
        <div className="space-y-2">

          <div className="mb-3">
            <label className="block font-bold mb-2 bg-[#fcfcfc] p-2 border-l-4 border-primary-500">
              Ingresos Anuales
            </label>
            {annualRevenueOptions.map((option, index) => (
              <div key={index} className="mb-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value={option}
                    checked={annualRevenue === option}
                    onChange={(e) => handleInputChange(e, "annualRevenue")}
                  />
                  <span className="ml-2">{option}</span>
                </label>
              </div>
            ))}
          </div>
          <div className="mb-3">
            <label className="block font-bold mb-2 bg-[#fcfcfc] p-2 border-l-4 border-primary-500">
              Cantidad de Empleados
            </label>
            {employeeCountOptions.map((option, index) => (
              <div key={index} className="mb-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value={option}
                    checked={employeeCount === option}
                    onChange={(e) => handleInputChange(e, "employeeCount")}
                  />
                  <span className="ml-2">{option}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-center">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 text-white bg-[#191654] rounded hover:bg-secondary-600 transition duration-300"
        >
          Guardar Cambios
        </button>
      </div>
      {submitError && (
        <div className="flex justify-center text-danger mt-2 mb-2">
          {submitError}
        </div>
      )}
      <ToastContainer style={{ marginTop: "100px" }} />
    </div>
  );
}
