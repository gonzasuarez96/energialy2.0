"use client";
import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import axios from "axios";

const ubicacionesOptions = [
  "Cuenca Neuquina",
  "Cuenca Golfo San Jorge",
  "Cuenca Austral",
  "Cuenca Cuyana",
  "Cuenca Noroeste",
];

const subcategoriesOptions = [
  "Opcion A",
  "Opcion B",
  "Opcion C",
  "Opcion D",
  "Opcion E",
];

const projectOptions = [
  "Proyecto A",
  "Proyecto B",
  "Proyecto C",
  "Proyecto D",
  "Proyecto E",
  "Proyecto F",
];
const serviceOptions = [
  "Servicio X",
  "Servicio Y",
  "Servicio Z",
  "Servicio 1",
  "Servicio 2",
  "Servicio 3",
];

export default function RegisterCompany() {
  // ------------ Estados Locales ---------------------//

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [locations, setLocations] = useState("");
  const [subcategories, setSubCategories] = useState("");
  const [foundationYear, setfoundationYear] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [employeeCount, setEmployeeCount] = useState(""); // Para la cantidad de empleados
  const [cuit, setCuit] = useState(""); // Para el CUIT de la empresa
  const [website, setWebsite] = useState(""); // Para el sitio web de la empresa
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [compreNeuquino, setCompreNeuquino] = useState(false); // Para indicar si la empresa tiene Compre Neuquino
  const [experience, setExperience] = useState([]);
  const [services, setServices] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [homologations, setHomologations] = useState([]);

  // ------------------------------------------------- //

  // -------- Handlers de campos ----------------- //

  const handleExperienceChange = (e, option) => {
    const selectedProjects = [...experience];
    if (e.target.checked) {
      selectedProjects.push(option);
    } else {
      const index = selectedProjects.indexOf(option);
      if (index !== -1) {
        selectedProjects.splice(index, 1);
      }
    }
    setExperience(selectedProjects);
  };

  const handleServiceChange = (e, option) => {
    const selectedServices = [...services];
    if (e.target.checked) {
      selectedServices.push(option);
    } else {
      const index = selectedServices.indexOf(option);
      if (index !== -1) {
        selectedServices.splice(index, 1);
      }
    }
    setServices(selectedServices);
  };

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyData = {
      name,
      description,
      locations,
      subcategories,
      foundationYear,
      annualRevenue,
      employeeCount,
      cuit
    };
    console.log("Datos enviados en companyData:", companyData);

    try {
      const response = await axios.post("/companies", companyData);
      console.log("Respuesta del servidor:", response);
    } catch (error) {
      console.error("Error al registrar la empresa:", error);
      console.log("Datos enviados en companyData:", companyData);
    }
  };
  // -------------------------------- //

  return (
    <div className="min-h-screen flex flex-col justify-center">
      {/* BANNER */}
      <div className="relative mb-4">
        <img
          src="https://energialy.ar/uploads/settings/home//Back-Acceso-Denegado.png"
          alt="Fondo de la imagen"
          className="w-full h-auto"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold">
                Creá tu Cuenta en Energialy
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* FORMULARIO */}

      <div className="flex-grow flex justify-center items-center">
        <form className="mb-2 pl-4 pr-4 pt-4" onSubmit={handleSubmit}>
          <div className="mb-3 items-center">
            <div className="mb-3 items-center">
              {step === 1 && (
                <div>
                  <h2>Registro de Empresa - Parte 1</h2>
                  <div className="mb-3">
                    <input
                      type="text"
                      id="name"
                      placeholder="Nombre de la empresa"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-lg rounded border"
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      id="description"
                      placeholder="Descripción de la empresa"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3 py-2 text-lg rounded border resize-y"
                      rows="4" // Puedes ajustar la cantidad de filas aquí
                    />
                  </div>
                  <button
                    onClick={handleNextStep}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Siguiente
                  </button>
                </div>
              )}
              {step === 2 && (
                <div>
                  <h2>Registro de Empresa - Parte 2</h2>
                  <div className="mt-4 space-y-4">
                    <div>
                      <select
                        value={locations}
                        onChange={(e) => setLocations(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                      >
                        <option value="">Seleccione una ubicación</option>
                        {ubicacionesOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        value={subcategories}
                        onChange={(e) => setSubCategories(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                      >
                        <option value="">Subcategoria</option>
                        {subcategoriesOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <input
                        type="number"
                        id="foundationYear"
                        placeholder="Año de fundación (ej. 1990)"
                        value={foundationYear}
                        onChange={(e) => setfoundationYear(e.target.value)}
                        className={`w-full px-3 py-2 text-lg rounded border ${
                          foundationYear.length === 4
                            ? "border-green-500"
                            : "border-red-500"
                        }`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        id="annualRevenue"
                        placeholder="Ingresos anuales de la empresa"
                        value={annualRevenue}
                        onChange={(e) => setAnnualRevenue(e.target.value)}
                        className="w-full px-3 py-2 text-lg rounded border"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        id="employeeCount"
                        placeholder="Cantidad de empleados"
                        value={employeeCount}
                        onChange={(e) => setEmployeeCount(e.target.value)}
                        className="w-full px-3 py-2 text-lg rounded border"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        id="cuit"
                        placeholder="CUIT de la empresa"
                        value={cuit}
                        onChange={(e) => setCuit(e.target.value)}
                        className="w-full px-3 py-2 text-lg rounded border"
                      />
                    </div>
                      {/* <div>
                        <input
                          type="text"
                          id="website"
                          placeholder="Sitio web de la empresa"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          className="w-full px-3 py-2 text-lg rounded border"
                        />
                      </div>
                      <div>
                        <label className="block mb-2">
                          ¿La empresa tiene Compre Neuquino?
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="compreNeuquino"
                            checked={compreNeuquino}
                            onChange={(e) => setCompreNeuquino(e.target.checked)}
                          />
                          <label htmlFor="compreNeuquino">Sí</label>
                        </div>
                      </div> */}
                    <div className="mt-4 space-x-4">
                    <button
                        onClick={() => setStep(step - 1)}
                        className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-[#191654]"
                      >
                        Volver
                      </button>
                      <button
                        className="px-4 py-2 text-white bg-[#191654] rounded hover:bg-secondary-600"
                        type="submit"
                      >
                        Registrarse
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* {step === 3 && (
                <div>
                  <h2>Registro de Empresa - Parte 3</h2>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block mb-2">
                        Trabajos/Proyectos de la Empresa
                      </label>
                      <div className="grid grid-cols-3">
                        {projectOptions.map((option, index) => (
                          <div key={index} className="mt-1">
                            <input
                              type="checkbox"
                              id={`project_${index}`}
                              value={option}
                              checked={experience.includes(option)}
                              onChange={(e) =>
                                handleExperienceChange(e, option)
                              }
                              className="mr-1"
                            />
                            <label htmlFor={`project_${index}`}>{option}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2">
                        Servicios que ofrece la Empresa
                      </label>
                      <div className="grid grid-cols-3">
                        {serviceOptions.map((option, index) => (
                          <div key={index} className="mt-1">
                            <input
                              type="checkbox"
                              id={`service_${index}`}
                              value={option}
                              checked={services.includes(option)}
                              onChange={(e) => handleServiceChange(e, option)}
                              className="mr-1"
                            />
                            <label htmlFor={`service_${index}`}>{option}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 space-x-4">
                      <button
                        onClick={() => setStep(step - 1)}
                        className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        Volver
                      </button>
                      <button
                        onClick={handleNextStep}
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                      >
                        Siguiente
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {step === 4 && (
                <div>
                  <h2>Registro de Empresa - Parte 4</h2>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block mb-2">
                        Certificados que obtuvo
                      </label>
                      <div className="grid grid-cols-3">
                        {projectOptions.map((option, index) => (
                          <div key={index} className="mt-1">
                            <input
                              type="checkbox"
                              id={`project_${index}`}
                              value={option}
                              checked={experience.includes(option)}
                              onChange={(e) =>
                                handleExperienceChange(e, option)
                              }
                              className="mr-1"
                            />
                            <label htmlFor={`project_${index}`}>{option}</label>
                          </div>
                        ))}
                      </div>
                      <div>
                        <label className="block mb-2">
                          Trabajos/Proyectos de la Empresa
                        </label>
                        <div className="grid grid-cols-3">
                          {projectOptions.map((option, index) => (
                            <div key={index} className="mt-1">
                              <input
                                type="checkbox"
                                id={`project_${index}`}
                                value={option}
                                checked={experience.includes(option)}
                                onChange={(e) =>
                                  handleExperienceChange(e, option)
                                }
                                className="mr-1"
                              />
                              <label htmlFor={`project_${index}`}>
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                      />
                      <label htmlFor="agreeToTerms">
                        De Acuerdo Con Nuestros Términos Y Condiciones
                      </label>
                    </div>
                    <div className="mt-4 space-x-4">
                      <button
                        onClick={() => setStep(step - 1)}
                        className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        Volver
                      </button>
                      <button
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                        type="submit"
                      >
                        Registrarse
                      </button>
                    </div>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
