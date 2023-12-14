"use client";
import React, { useState, useEffect } from "react";
import { Montserrat } from "next/font/google";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  displayFailedMessage,
  displaySuccessMessage,
} from "../../../components/Toastify";
import { useRouter } from "next/navigation";
import getLocalStorage from "@/app/Func/localStorage";
import { urlProduction } from "@/app/data/dataGeneric";
import { useGetCompaniesByIdQuery } from "@/app/redux/services/companiesApi";

export default function DatosBasicos() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  console.log(user);
  const [companyData, setCompanyData] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [foundationYear, setfoundationYear] = useState("");
  const [cuit, setCuit] = useState("");

  const { data: companyInfo, isLoading } = useGetCompaniesByIdQuery(
    user?.company.id
  );

  useEffect(() => {
    const fetchData = async () => {
      const userData = getLocalStorage();
      setUser(userData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (companyInfo) {
      setCompanyData(companyInfo);
      setName(companyInfo.name || "");
      setDescription(companyInfo.description || "");
      setfoundationYear(companyInfo.foundationYear || "");
      setCuit(companyInfo.cuit || "");
    }
  }, [companyInfo]);

  const [isEdited, setIsEdited] = useState(false);
  const [submitError, setSubmitError] = useState("");

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
      case "name":
        setName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "foundationYear":
        setfoundationYear(value);
        break;
      case "cuit":
        setCuit(value);
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

    if (name.trim() !== "") {
      updatedData.name = name.trim();
    }
    if (description.trim() !== "") {
      updatedData.description = description.trim();
    }
    if (foundationYear !== "") {
      updatedData.foundationYear = foundationYear;
    }
    if (cuit.trim() !== "") {
      updatedData.cuit = cuit.trim();
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
        <div className="mb-3">
          <label className="block font-bold mb-2 bg-[#fcfcfc] p-2 border-l-4 border-primary-500">
            Nombre de la empresa
          </label>
          <input
            type="text"
            id="name"
            //placeholder={user.company?.name}
            value={name}
            onChange={(e) => handleInputChange(e, "name")}
            className="w-full px-3 py-2 text-lg rounded border"
          />
        </div>
        <div className="mb-3">
          <label className="block font-bold mb-2 bg-[#fcfcfc] p-2 border-l-4 border-primary-500">
            Descripción
          </label>
          <textarea
            id="description"
            placeholder="Descripción de la empresa"
            value={description}
            onChange={(e) => handleInputChange(e, "description")}
            className="w-full px-3 py-2 text-lg rounded border resize-y"
            rows="4" // Puedes ajustar la cantidad de filas aquí
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-3">
            <label className="block font-bold mb-2 bg-[#fcfcfc] p-2 border-l-4 border-primary-500">
              Año de fundacion
            </label>
            <input
              type="number"
              id="foundationYear"
              placeholder="(ej. 1990)"
              value={foundationYear}
              onChange={(e) => handleInputChange(e, "foundationYear")}
              className={`w-full px-3 py-2 text-lg border ${
                foundationYear.toString().length === 4
                  ? "border-green-500"
                  : "border-red-500"
              }`}
            />
          </div>
          <div className="mb-3">
            <label className="block font-bold mb-2 bg-[#fcfcfc] p-2 border-l-4 border-primary-500">
              CUIT de la empresa
            </label>
            <input
              type="text"
              id="cuit"
              placeholder="Sin comas ni puntos"
              value={cuit}
              onChange={(e) => handleInputChange(e, "cuit")}
              className="w-full px-3 py-2 text-lg border"
            />
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
