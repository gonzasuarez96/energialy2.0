"use client";
import React, { useState, useEffect } from "react";
import { Montserrat } from "next/font/google";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { displayFailedMessage, displaySuccessMessage } from "./Toastify";
import { annualRevenueOptions, employeeCountOptions, organizationTypes} from '@/app/data/dataGeneric'
import {handleCategoryChange, handleSubcategoryChange} from '@/app/Func/handlers'
import getLocalStorage from "../Func/localStorage";
//import { useGetLocationsQuery } from "../redux/services/locationApi";


const stepsForm = ["01", "02", "03", "04"];

export default function RegisterCompany() {
  const router = useRouter();
  const user = getLocalStorage();

  // ------------ Estados Locales ---------------------//
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [foundationYear, setfoundationYear] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [cuit, setCuit] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);


  //-------------- Funciones para traer las opciones del form --------------//
  const [locationsOptions, setLocationsOptions] = useState([]);
  const [subcategoriesOptions, setSubcategoriesOptions] = useState([]);
  const [subcategorySelected, setSubcategorySelected] = useState([]);
  const [stepCompletion, setStepCompletion] = useState([false, false, false, false]);
  const [errorMessages, setErrorMessages] = useState({
    step1: "",
    step2: "",
    step3: "",
    step4: "",
  });
  
  //const { data: locations, isLoading } = useGetLocationsQuery();


  const getLocation = async () => {
    try {
      const response = await axios.get("http://localhost:3001/locations");
      const transformedData = response.data.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      setLocationsOptions(transformedData);
      console.log("Locations: ", transformedData);
    } catch (error) {
      console.log("Error al traer las ubicaciones: ", error);
      throw error;
    }
  };

  

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/categories");
      const transformedData = response.data.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      setCategories(transformedData);
      console.log("Categories: ", transformedData);
    } catch (error) {
      console.log("Error al traer las categorias: ", error);
      throw error;
    }
  };

  const getSubcategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/subcategories");
      const transformedData = response.data.map((item) => ({
        id: item.id,
        name: item.name,
        categoryId: item.parentCategory.id,
      }));
      setSubcategories(transformedData);
      console.log('Subcategories: ', transformedData)
    } catch (error) {
      console.log("Error al traer las subcategorias: ", error);
      throw error;
    }
  };

  useEffect(() => {
    getLocation();
    getSubcategories();
    getCategories();
  }, []);

  // -------- Handlers de campos ----------------- //

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    console.log('categoryId:',categoryId)
    const filteredSubcategories = subcategories.filter(
      (subcategory) => subcategory.categoryId === categoryId
    );
    setSubcategoriesOptions(filteredSubcategories);
    console.log('nuevas opciones de subcat:',filteredSubcategories)
  };

  const handleSubcategoryChange = (e) => {
    const subcategoryId = e.target.value;
    setSubcategorySelected((prevSubcategories) => {
      if (prevSubcategories.includes(subcategoryId)) {
        return prevSubcategories.filter(id => id !== subcategoryId);
      } else {
        return [...prevSubcategories, subcategoryId];
      }
    });
    console.log('Subcategorias seleccionadas:', subcategoryId)
  };
  console.log('Estado subcategorySelected:', subcategorySelected)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyData = {
      name,
      description,
      locations,
      subcategories: subcategorySelected,
      foundationYear,
      annualRevenue,
      employeeCount,
      cuit,
      profilePicture,
      bannerPicture,
      organizationType,
      userId: user.id,
    };

    console.log("Datos enviados en companyData:", companyData);


    try {
      const response = await axios.post(
        "http://localhost:3001/companies",
        companyData,
        {
          headers: {
            "Content-Type": "application/json", // Cambiado a JSON
          },
        }
      );
      console.log("Respuesta del servidor:", response);
      displaySuccessMessage("Empresa registrada con éxito");
      setTimeout(() => {
        router.push("/directory");
      }, 2000);
    } catch (error) {
      console.error("Error al registrar la empresa:", error);
      console.log("Datos enviados en companyData:", companyData);
      displayFailedMessage(error.response.data.error);
    }
  };

  // ------------------------ Cloudinary ----------------------------//

  const [profilePicture, setProfilePicture] = useState("");
  const [bannerPicture, setBannerPicture] = useState("");
  const [profilePictureError, setProfilePictureError] = useState("");
  const [bannerPictureError, setBannerPictureError] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e, imageType) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "energialy_users");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dbraa6jpj/image/upload",
        data  
      );
      const file = res.data;
      console.log("Respuesta de cloudinary:", res);

      if (imageType === "profile") {
        setProfilePicture(file.secure_url);
      } else if (imageType === "banner") {
        setBannerPicture(file.secure_url);
      }

      setLoading(false);
    } catch (error) {
      console.log("Error al cargar la imagen:", error);
      setLoading(false);
    }
  };

  // ------------------------------------------------------------------------ //

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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="mb-3">
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
                    <div className="mb-3">
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

                  <button
                    onClick={handleNextStep}
                    className="px-4 py-2 text-white bg-[#191654] rounded hover:bg-secondary-600 transition duration-300"
                  >
                    Siguiente
                  </button>
                </div>
              )}
              {step === 2 && (
                <div>
                  <div className="space-y-2">
                    <div className="mb-3">
                      <label className="block mb-2 font-bold">Tipo de Organización</label>
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
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block mb-2 font-bold">Ingresos Anuales</label>
                        {annualRevenueOptions.map((option, index) => (
                          <div key={index} className="mb-2">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                value={option}
                                checked={annualRevenue === option}
                                onChange={(e) =>
                                  setAnnualRevenue(e.target.value)
                                }
                              />
                              <span className="ml-2">{option}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                      <div>
                        <label className="block mb-2 font-bold">
                          Cantidad de Empleados
                        </label>
                        {employeeCountOptions.map((option, index) => (
                          <div key={index} className="mb-2">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                value={option}
                                checked={employeeCount === option}
                                onChange={(e) =>
                                  setEmployeeCount(e.target.value)
                                }
                              />
                              <span className="ml-2">{option}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 space-x-4">
                      <button
                        onClick={() => setStep(step - 1)}
                        className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-secondary-600 hover:text-white transition duration-300"
                      >
                        Volver
                      </button>
                      <button
                        onClick={handleNextStep}
                        className="px-4 py-2 text-white bg-[#191654] rounded hover:bg-secondary-600 transition duration-300"
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
                    <label className="block mb-2 font-bold">
                      Seleccionar ubicaciones
                    </label>
                    <div className="flex flex-wrap">
                      {locationsOptions.map((option) => (
                        <div key={option.id} className="w-1/2 mb-2">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              value={option.id}
                              checked={locations.includes(option.id)}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                setLocations((prevLocations) =>
                                  isChecked
                                    ? [...prevLocations, option.id]
                                    : prevLocations.filter(
                                        (id) => id !== option.id
                                      )
                                );
                              }}
                            />
                            <span className="ml-2">{option.name}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-3">
                    <select
                      value=''
                      onChange={handleCategoryChange} 
                      className="border rounded px-2 py-2 w-full"
                    >
                      <option value="">Seleccione una categoria</option>
                      {categories?.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="block mb-2 font-bold">Subcategorías</label>
                    <div className="flex flex-wrap">
                      {subcategoriesOptions.map((option) => (
                        <div key={option.id} className="w-1/2 mb-2">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              value={option.id}
                              checked={subcategorySelected.includes(option.id)}
                              onChange={handleSubcategoryChange}
                            />
                            <span className="ml-2">{option.name}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 space-x-4">
                    <button
                      onClick={() => setStep(step - 1)}
                      className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-secondary-600 hover:text-white transition duration-300"
                    >
                      Volver
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="px-4 py-2 text-white bg-[#191654] rounded hover:bg-secondary-600 transition duration-300"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              )}
              {step === 4 && (
                <div>
                  <div className="mb-3">
                    <label htmlFor="profilePicture" className="block mb-2 font-bold">Foto de Perfil</label>
                    <input
                      type="file"
                      id="profilePicture"
                      accept="image/*"
                      onChange={(e) => uploadImage(e, "profile")}
                      className="w-full border rounded px-2 py-1"
                    />
                    {profilePictureError && (
                      <p className="text-red-500 text-sm">
                        {profilePictureError}
                      </p>
                    )}
                    {loading ? (
                      <h3>Cargando Imagenes...</h3>
                    ) : (
                      <img src={profilePicture} style={{ width: "300px" }} />
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="bannerPicture" className="block mb-2 font-bold">Banner</label>
                    <input
                      type="file"
                      id="bannerPicture"
                      accept="image/*"
                      onChange={(e) => uploadImage(e, "banner")}
                      className="w-full border rounded px-2 py-1"
                    />
                    {bannerPictureError && (
                      <p className="text-red-500 text-sm">
                        {bannerPictureError}
                      </p>
                    )}
                    {loading ? (
                      <h3>Cargando Imagenes...</h3>
                    ) : (
                      <img src={bannerPicture} style={{ width: "300px" }} />
                    )}
                  </div>
                  <div className="mt-4 space-x-4">
                    <button
                      onClick={() => setStep(step - 1)}
                      className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-secondary-600 hover:text-white transition duration-300"
                    >
                      Volver
                    </button>
                    <button
                      className="px-4 py-2 text-white bg-[#191654] rounded hover:bg-secondary-600 transition duration-300"
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
