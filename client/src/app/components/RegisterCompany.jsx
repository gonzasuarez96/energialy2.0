"use client";
import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const displaySuccessMessage = (mensaje) => {
  toast.success(mensaje, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const displayFailedMessage = (mensaje) => {
  toast.error(mensaje, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

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

const organizationTypes = [
  "Organismo Público",
  "Operadora",
  "PyME",
  "Cámara/Cluster/Federación",
  "Profesional independiente",
  "Servicios especiales",
];

const stepsForm = ["01", "02", "03", "04"];

export default function RegisterCompany() {
  // ------------ Estados Locales ---------------------//

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [locations, setLocations] = useState("");
  const [subcategories, setSubCategories] = useState("");
  const [foundationYear, setfoundationYear] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [cuit, setCuit] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [bannerPicture, setBannerPicture] = useState(null);
  const [profilePictureError, setProfilePictureError] = useState("");
  const [bannerPictureError, setBannerPictureError] = useState("");
  const [organizationType, setOrganizationType] = useState("");

  const [website, setWebsite] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [compreNeuquino, setCompreNeuquino] = useState(false);
  const [experience, setExperience] = useState([]);
  const [services, setServices] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [homologations, setHomologations] = useState([]);

  const router = useRouter();

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

  const handleProfilePictureChange = (e) => {
    const pic = e.target.files[0];
    if (pic && pic.type.startsWith("image/")) {
      setProfilePicture(pic);
      setProfilePictureError("");
    } else {
      setProfilePicture(null);
      setProfilePictureError("Por favor selecciona una imagen válida.");
    }
  };

  const handleBannerPictureChange = (e) => {
    const picBanner = e.target.files[0];
    if (picBanner && picBanner.type.startsWith("image/")) {
      setBannerPicture(picBanner);
      setBannerPictureError("");
    } else {
      setBannerPicture(null);
      setBannerPictureError("Por favor selecciona una imagen válida.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("locations", locations);
    formData.append("subcategories", subcategories);
    formData.append("foundationYear", foundationYear);
    formData.append("annualRevenue", annualRevenue);
    formData.append("employeeCount", employeeCount);
    formData.append("cuit", cuit);
    formData.append("profileImage", profilePicture);
    formData.append("bannerImage", bannerPicture);
    formData.append("organizationType",organizationType);


    // ----- Esto solo esta hecho para poder ver en consola lo q se manda, luego se borra ----- //
    function formDataToObject(formData) {
      const obj = {};
      formData.forEach((value, key) => {
        if (!obj.hasOwnProperty(key)) {
          obj[key] = value;
        } else {
          if (!Array.isArray(obj[key])) {
            obj[key] = [obj[key]];
          }
          obj[key].push(value);
        }
      });
      return obj;
    }
    const formDataObject = formDataToObject(formData);
    console.log("Datos enviados en formDataObject:",formDataObject);

    // ------------------------------------------------------------------------ //

    console.log("Datos enviados en formData:", formData);

    try {
      const response = await axios.post(
        "http://localhost:3001/companies",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Respuesta del servidor:", response);
      displaySuccessMessage("Empresa registrada con exito");
      setTimeout(() => {
        router.push("/directory");
      }, 2000);
    } catch (error) {
      console.error("Error al registrar la empresa:", error);
      console.log("Datos enviados en companyData:", formData);
      displayFailedMessage(error.response.data.error);
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
          <div className="container px-4 mx-auto relative z-10 text-center text-white font-poppins">
            <h2 className="text-4xl font-bold mb-2">Registra tu empresa en</h2>
            <h2 className="text-4xl font-bold">Energialy</h2>
          </div>
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
      </div>

      {/* FORMULARIO */}

      <div className="w-full">
        <div className="m-20">
          <form
            className="m-10 p-8 max-w-[70%] mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="mb-3 items-center">
              <div className="w-full mb-15 mx-auto text-center font-poppins">
                <h3 className="text-2xl leading-7 font-bold mb-4">
                  Indicános algunos datos
                </h3>
                <p className="text-base leading-6 mb-4">
                  Luego podrás completar el perfil desde tu cuenta.
                </p>
              </div>

              <div className="flex-grow flex justify-center items-center">
                <ul className="flex p-0 mb-5">
                  {stepsForm.map((option, index) => (
                    <li key={index} className="mx-4">
                      <a
                        onClick={() => setStep(index + 1)}
                        className={`no-underline w-10 h-10 cursor-pointer flex items-center justify-center rounded-full border-2 border-solid font-bold text-xs leading-[38px] font-poppins ${
                          step === index + 1
                            ? "border-[#191654] text-[#191654]"
                            : "text-gray-400 border-gray-400"
                        }`}
                      >
                        {option}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {step === 1 && (
                <div>
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
                    className="px-4 py-2 text-white bg-[#191654] rounded hover:bg-secondary-600"
                  >
                    Siguiente
                  </button>
                </div>
              )}
              {step === 2 && (
                <div>
                  <div className="space-y-2">
                    <div>
                      <select
                        value={locations}
                        onChange={(e) => setLocations(e.target.value)}
                        className="border rounded px-2 py-2 w-full"
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
                        className="border rounded px-2 py-2 w-full"
                      >
                        <option value="">Subcategoria</option>
                        {subcategoriesOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <input
                          type="number"
                          id="foundationYear"
                          placeholder="Año de fundación (ej. 1990)"
                          value={foundationYear}
                          onChange={(e) => setfoundationYear(e.target.value)}
                          className={`w-full px-3 py-2 text-lg border ${
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
                          className="w-full px-3 py-2 text-lg border"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          id="employeeCount"
                          placeholder="Cantidad de empleados"
                          value={employeeCount}
                          onChange={(e) => setEmployeeCount(e.target.value)}
                          className="w-full px-3 py-2 text-lg border"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          id="cuit"
                          placeholder="CUIT de la empresa"
                          value={cuit}
                          onChange={(e) => setCuit(e.target.value)}
                          className="w-full px-3 py-2 text-lg border"
                        />
                      </div>
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
                        className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-secondary-600 hover:text-white"
                      >
                        Volver
                      </button>
                      <button
                        onClick={handleNextStep}
                        className="px-4 py-2 text-white bg-[#191654] rounded hover:bg-secondary-600"
                      >
                        Siguiente
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div>
                  <div className="mb-3">
                    <label htmlFor="profilePicture">Foto de Perfil</label>
                    <input
                      type="file"
                      id="profilePicture"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      className="w-full border rounded px-2 py-1"
                    />
                    {profilePictureError && (
                      <p className="text-red-500 text-sm">
                        {profilePictureError}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="bannerPicture">Banner</label>
                    <input
                      type="file"
                      id="bannerPicture"
                      accept="image/*"
                      onChange={handleBannerPictureChange}
                      className="w-full border rounded px-2 py-1"
                    />
                    {bannerPictureError && (
                      <p className="text-red-500 text-sm">
                        {bannerPictureError}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 space-x-4">
                    <button
                      onClick={() => setStep(step - 1)}
                      className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-secondary-600 hover:text-white"
                    >
                      Volver
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="px-4 py-2 text-white bg-[#191654] rounded hover:bg-secondary-600"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              )}
              {step === 4 && (
                <div>
                  <div className="mb-3">
                    <label className="block mb-2">Tipo de Organización</label>
                    <div className="flex flex-wrap">
                      {organizationTypes.map((type, index) => (
                        <div key={index} className="w-1/2 mb-2">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              id={`organizationType${index}`}
                              value={type}
                              checked={organizationType === type}
                              onChange={(e) =>
                                setOrganizationType(e.target.value)
                              }
                            />
                            <span className="ml-2">{type}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 space-x-4">
                    <button
                      onClick={() => setStep(step - 1)}
                      className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-secondary-600 hover:text-white"
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
              )}
            </div>
          </form>
        </div>
        <ToastContainer style={{ marginTop: "100px" }} />
      </div>
    </div>
  );
}

// <div className="mt-4 space-y-4">
//                     <div>
//                       <label className="block mb-2">
//                         Trabajos/Proyectos de la Empresa
//                       </label>
//                       <div className="grid grid-cols-3">
//                         {projectOptions.map((option, index) => (
//                           <div key={index} className="mt-1">
//                             <input
//                               type="checkbox"
//                               id={`project_${index}`}
//                               value={option}
//                               checked={experience.includes(option)}
//                               onChange={(e) =>
//                                 handleExperienceChange(e, option)
//                               }
//                               className="mr-1"
//                             />
//                             <label htmlFor={`project_${index}`}>{option}</label>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block mb-2">
//                         Servicios que ofrece la Empresa
//                       </label>
//                       <div className="grid grid-cols-3">
//                         {serviceOptions.map((option, index) => (
//                           <div key={index} className="mt-1">
//                             <input
//                               type="checkbox"
//                               id={`service_${index}`}
//                               value={option}
//                               checked={services.includes(option)}
//                               onChange={(e) => handleServiceChange(e, option)}
//                               className="mr-1"
//                             />
//                             <label htmlFor={`service_${index}`}>{option}</label>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="mt-4 space-x-4">
//                       <button
//                         onClick={() => setStep(step - 1)}
//                         className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-secondary-600"
//                       >
//                         Volver
//                       </button>
//                       <button
//                         onClick={handleNextStep}
//                         className="px-4 py-2 text-white bg-[#191654] rounded hover:bg-secondary-600"
//                       >
//                         Siguiente
//                       </button>
//                     </div>
//                   </div>
//                   <div className="mt-4 space-y-4">
//                   <div>
//                     <label className="block mb-2">
//                       Certificados que obtuvo
//                     </label>
//                     <div className="grid grid-cols-3">
//                       {projectOptions.map((option, index) => (
//                         <div key={index} className="mt-1">
//                           <input
//                             type="checkbox"
//                             id={`project_${index}`}
//                             value={option}
//                             checked={experience.includes(option)}
//                             onChange={(e) =>
//                               handleExperienceChange(e, option)
//                             }
//                             className="mr-1"
//                           />
//                           <label htmlFor={`project_${index}`}>{option}</label>
//                         </div>
//                       ))}
//                     </div>
//                     <div>
//                       <label className="block mb-2">
//                         Trabajos/Proyectos de la Empresa
//                       </label>
//                       <div className="grid grid-cols-3">
//                         {projectOptions.map((option, index) => (
//                           <div key={index} className="mt-1">
//                             <input
//                               type="checkbox"
//                               id={`project_${index}`}
//                               value={option}
//                               checked={experience.includes(option)}
//                               onChange={(e) =>
//                                 handleExperienceChange(e, option)
//                               }
//                               className="mr-1"
//                             />
//                             <label htmlFor={`project_${index}`}>
//                               {option}
//                             </label>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       id="agreeToTerms"
//                       checked={agreeToTerms}
//                       onChange={(e) => setAgreeToTerms(e.target.checked)}
//                     />
//                     <label htmlFor="agreeToTerms">
//                       De Acuerdo Con Nuestros Términos Y Condiciones
//                     </label>
//                   </div>
//                   <div className="mt-4 space-x-4">
//                     <button
//                       onClick={() => setStep(step - 1)}
//                       className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-gray-300"
//                     >
//                       Volver
//                     </button>
//                     <button
//                       className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
//                       type="submit"
//                     >
//                       Registrarse
//                     </button>
//                   </div>
//                 </div>
