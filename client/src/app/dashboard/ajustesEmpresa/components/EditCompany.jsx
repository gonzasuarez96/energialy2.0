"use client";
import React, { useState, useEffect, use } from "react";
import { Montserrat } from "next/font/google";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import getLocalStorage from "@/app/Func/localStorage";

// ---------------------- Toastify -------------------------//
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
//---------------------------------------------------------------//

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

export default function EditCompany({ option }) {
  console.log("option:", option);
  const router = useRouter();

  // ------------ Estados locales para los campos editables ---------------------//
  const [user, setUser] = useState(null);
  console.log(user)
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
  const [isEdited, setIsEdited] = useState(false);
  const [submitError, setSubmitError] = useState("");

  //-------------- Funciones para traer las opciones del form --------------//
  const [locationsOptions, setLocationsOptions] = useState([]);
  const [subcategoriesOptions, setSubcategoriesOptions] = useState([]);
  const [subcategorySelected, setSubcategorySelected] = useState([]);
  const [subcategoryNew, setSubcategoryNew] = useState([]);

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
      console.log("Subcategories: ", transformedData);
    } catch (error) {
      console.log("Error al traer las subcategorias: ", error);
      throw error;
    }
  };

  

  // -------- Handlers de campos ----------------- //

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    console.log("categoryId:", categoryId);
    const filteredSubcategories = subcategories.filter(
      (subcategory) => subcategory.categoryId === categoryId
    );
    setSubcategoriesOptions(filteredSubcategories);
    console.log("nuevas opciones de subcat:", filteredSubcategories);
  };

  const handleSubcategoryChange = (e) => {
    const subcategoryId = e.target.value;
    setSubcategorySelected((prevSubcategories) => {
      if (prevSubcategories.includes(subcategoryId)) {
        return prevSubcategories.filter((id) => id !== subcategoryId);
      } else {
        return [...prevSubcategories, subcategoryId];
      }
    });
    console.log("Subcategorias seleccionadas:", subcategoryId);
  };
  console.log("Estado subcategorySelected:", subcategorySelected);

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
      case "locations":
        setLocations(value);
        break;
      case "categories":
        setCategories(value);
        break;
      case "subcategories":
        setSubcategories(value);
        break;
      case "foundationYear":
        setfoundationYear(value);
        break;
      case "annualRevenue":
        setAnnualRevenue(value);
        break;
      case "employeeCount":
        setEmployeeCount(value);
        break;
      case "cuit":
        setCuit(value);
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

    // Aquí puedes enviar los datos actualizados al servidor
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
    
    if (foundationYear.trim() !== "") {
      updatedData.foundationYear = foundationYear.trim();
    }
    
    if (annualRevenue.trim() !== "") {
      updatedData.annualRevenue = annualRevenue.trim();
    }
    
    if (employeeCount.trim() !== "") {
      updatedData.employeeCount = employeeCount.trim();
    }
    
    if (cuit.trim() !== "") {
      updatedData.cuit = cuit.trim();
    }
    
    if (organizationType.trim() !== "") {
      updatedData.organizationType = organizationType.trim();
    }
    
    if (locations.length > 0) {
      updatedData.locations = locations;
    }
    
    if (subcategories.length > 0 || subcategorySelected.length > 0) {
      updatedData.subcategories = subcategorySelected.length > 0 ? subcategories : subcategorySelected;
    }
    
    updatedData.id = user.company.id;
    
    console.log('Datos enviados:', updatedData)
    try {
      const response = await axios.put(
        `http://localhost:3001/companies/${user.company.id}`,
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

  useEffect(() => {
    const user = getLocalStorage()
    setUser(user)
    getLocation();
    getSubcategories();
    getCategories();
  }, []);

  return (
    <div className="p-5 m-2">
      {(!option || option === 0 || typeof option === 'undefined') && (
        <div>
          <div className="mb-3">
            <label className="block font-bold mb-2 bg-[#fcfcfc] p-2 border-l-4 border-primary-500">
              Nombre de la empresa
            </label>
            <input
              type="text"
              id="name"
              //placeholder={user.company?.name}
              value={user?.company.name}
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
                  foundationYear.length === 4
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
      )}
      {option === 1 && (
        <div>
          <div className="space-y-2">
            <div className="mb-3">
              <label className="block font-bold mb-2 bg-[#fcfcfc] p-2 border-l-4 border-primary-500">
                Tipo de Organización
              </label>
              <div className="flex flex-wrap">
                {organizationTypes.map((type, index) => (
                  <div key={index} className="w-1/2 mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        id={`organizationType${index}`}
                        value={type}
                        checked={organizationType === type}
                        onChange={(e) => handleInputChange(e, "organizationType")}
                      />
                      <span className="ml-2">{type}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

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
      )}
      {option === 2 && (
        <div>
          <div className="mb-3">
            <label className="block font-bold mb-2 bg-[#fcfcfc] p-2 border-l-4 border-primary-500">
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
                            : prevLocations.filter((id) => id !== option.id)
                        );
                        handleInputChange(e, "locations");
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
              value=""
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
            <label className="block font-bold mb-2 bg-[#fcfcfc] p-2 border-l-4 border-primary-500">
              Subcategorías
            </label>
            <div className="flex flex-wrap">
              {subcategoriesOptions.map((option) => (
                <div key={option.id} className="w-1/2 mb-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value={option.id}
                      checked={subcategorySelected.includes(option.id)}
                      onChange={(e) => {
                        handleSubcategoryChange;
                        handleInputChange(e, "subcategories");
                      }}
                    />
                    <span className="ml-2">{option.name}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {option === 3 && (
        <div>
          <div className="mb-3">
            <label
              htmlFor="profilePicture"
              className="block font-bold mb-2 bg-[#fcfcfc] p-2 border-l-4 border-primary-500"
            >
              Foto de Perfil
            </label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={(e) => {uploadImage(e, "profile"), handleInputChange(e, "profilePicture")}}
              className="w-full border rounded px-2 py-1"
            />
            {profilePictureError && (
              <p className="text-red-500 text-sm">{profilePictureError}</p>
            )}
            {loading ? (
              <h3>Cargando Imagenes...</h3>
            ) : (
              <img src={profilePicture} style={{ width: "300px" }} />
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="bannerPicture"
              className="block font-bold mb-2 bg-[#fcfcfc] p-2 border-l-4 border-primary-500"
            >
              Banner
            </label>
            <input
              type="file"
              id="bannerPicture"
              accept="image/*"
              onChange={(e) => {uploadImage(e, "banner");handleInputChange(e, "bannerPicture")}}
              className="w-full border rounded px-2 py-1"
            />
            {bannerPictureError && (
              <p className="text-red-500 text-sm">{bannerPictureError}</p>
            )}
            {loading ? (
              <h3>Cargando Imagenes...</h3>
            ) : (
              <img src={bannerPicture} style={{ width: "300px" }} />
            )}
          </div>
        </div>
      )}
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
