"use client";
import React, { useState } from "react";
import { Montserrat } from 'next/font/google';
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
  const [companyCategory, setCompanyCategory] = useState("");
  const [compreNeuquino, setCompreNeuquino] = useState(false); // Para indicar si la empresa tiene Compre Neuquino
  const [experience, setExperience] = useState([
    { name: "", description: "" }, // Puedes tener un objeto inicial si deseas
  ])
  const [services, setServices] = useState([
    { name: "", description: "" }, // Puedes tener un objeto inicial si deseas
  ]);
  const [certifications, setCertifications] = useState([
    { name: "", description:"" },
  ])
  const [ homologations, setHomologations] = useState([
    { name: "", description: ""}, 
  ])

  // ------------------------------------------------- //


  // -------- Handlers de campos ----------------- //
  const handleExperienceNameChange = (e, index) => {
    const newExperience = [...experience];
    newExperience[index].title = e.target.value;
    setExperience(newExperience);
  };

  const handleExperienceDescriptionChange = (e, index) => {
    const newExperience = [...experience];
    newExperience[index].description = e.target.value;
    setExperience(newExperience);
  };

  const handleServiceNameChange = (e, index) => {
    const newServices = [...services];
    newServices[index].name = e.target.value;
    setServices(newServices);
  };

  const handleServiceDescriptionChange = (e, index) => {
    const newServices = [...services];
    newServices[index].description = e.target.value;
    setServices(newServices);
  };

    const handleCertificationNameChange = (e, index) => {
    const newCertification = [...certifications];
    newCertification[index].name = e.target.value;
    setCertifications(newCertification);
  };

  const handleCertificationDescriptionChange = (e, index) => {
    const newCertification = [...certifications];
    newCertification[index].description = e.target.value;
    setCertifications(newCertification);
  };

  const handleHomologationNameChange = (e, index) => {
    const newHomologation = [...homologations];
    newHomologation[index].name = e.target.value;
    setHomologations(newHomologation);
  };

  const handleHomologationDescriptionChange = (e, index) => {
    const newHomologation = [...homologations];
    newHomologation[index].description = e.target.value;
    setHomologations(newHomologation);
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
      // Agrega otros campos aquí...
      experience,
      services,
      certifications,
      homologations,
      agreeToTerms,
    };

    try {
      const response = await axios.post("/companies", companyData);
      console.log("Datos enviados en companyData:", companyData)
    }catch(error){
      console.error("Error al registrar la empresa:", error);
      console.log("Datos enviados en companyData:", companyData)
    }
  }
  // -------------------------------- //

  return (
    <div className="d-flex justify-content-center bg-light pt-5 pb-5">
      <div className="bg-white shadow rounded w-50">
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
                  <div>
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
            {step === 3 && (
              <div>
                <h2>Registro de Empresa - Parte 3</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block mb-2">
                      Trabajos/Proyectos de la Empresa
                    </label>
                    {experience.map((exp, index) => (
                      <div key={index} className="mt-4">
                        <input
                          type="text"
                          placeholder="Nombre"
                          value={exp.title}
                          onChange={(e) =>
                            handleExperienceNameChange(e, index)
                          }
                          className="w-full px-3 py-2 text-lg rounded border"
                        />
                        <textarea
                          placeholder="Descripción"
                          value={exp.description}
                          onChange={(e) =>
                            handleExperienceDescriptionChange(e, index)
                          }
                          className="w-full px-3 py-2 text-lg rounded border resize-y"
                          rows="4"
                        />
                      </div>
                    ))}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        // Agregar un nuevo objeto a la lista de experience
                        setExperience([
                          ...experience,
                          { title: "", description: "" },
                        ]);
                      }}
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Agregar Proyecto
                    </button>
                  </div>
                  {/* Campos similares para "Servicios," "Certificaciones" y "Homologaciones" */}
                  <div>
                    <label className="block mb-2">
                      Servicios que Ofrece la Empresa
                    </label>
                    {/* Botón para agregar un nuevo servicio */}
                    {services.map((service, index) => (
                      <div key={index} className="mt-4">
                        <input
                          type="text"
                          placeholder="Servicio"
                          value={service.name}
                          onChange={(e) => handleServiceNameChange(e, index)}
                          className="w-full px-3 py-2 text-lg rounded border"
                        />
                        <textarea
                          placeholder="Descripción"
                          value={service.description}
                          onChange={(e) =>
                            handleServiceDescriptionChange(e, index)
                          }
                          className="w-full px-3 py-2 text-lg rounded border resize-y"
                          rows="4"
                        />
                      </div>
                    ))}
                  </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        // Agregar un nuevo objeto a la lista de services
                        setServices([
                          ...services,
                          { name: "", description: "" },
                        ]);
                      }}
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Agregar Servicio
                    </button>
                    <div>
                    <label className="block mb-2">
                      Certificaciones
                    </label>
                    {/* Botón para agregar un nuevo servicio */}
                    {certifications.map((certification, index) => (
                      <div key={index} className="mt-4">
                        <input
                          type="text"
                          placeholder="Certificacion"
                          value={certification.name}
                          onChange={(e) => handleCertificationNameChange(e, index)}
                          className="w-full px-3 py-2 text-lg rounded border"
                        />
                        <textarea
                          placeholder="Descripción"
                          value={certification.description}
                          onChange={(e) =>
                            handleCertificationDescriptionChange(e, index)
                          }
                          className="w-full px-3 py-2 text-lg rounded border resize-y"
                          rows="4"
                        />
                      </div>
                    ))}
                  </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setCertifications([
                          ...certifications,
                          { name: "", description: "" },
                        ]);
                      }}
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Agregar Certificacion
                    </button>
                    <div>
                    <label className="block mb-2">
                      Homologaciones
                    </label>
                    {/* Botón para agregar un nuevo servicio */}
                    {homologations.map((homologation, index) => (
                      <div key={index} className="mt-4">
                        <input
                          type="text"
                          placeholder="Homologacion"
                          value={homologation.name}
                          onChange={(e) => handleHomologationNameChange(e, index)}
                          className="w-full px-3 py-2 text-lg rounded border"
                        />
                        <textarea
                          placeholder="Descripción"
                          value={homologation.description}
                          onChange={(e) =>
                            handleHomologationDescriptionChange(e, index)
                          }
                          className="w-full px-3 py-2 text-lg rounded border resize-y"
                          rows="4"
                        />
                      </div>
                    ))}
                  </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        // Agregar un nuevo objeto a la lista de services
                        setHomologations([
                          ...homologations,
                          { name: "", description: "" },
                        ]);
                      }}
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Agregar Homologacion
                    </button>
                  {/* Campos similares para "Certificaciones" y "Homologaciones" */}
                  {/* ... */}
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
                {/* Agregar campos para la parte 3 */}
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
                  <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600" type="submit">
                    Registrarse
                  </button>
                </div>
              </div>
            )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
