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

export default function EditCompany() {
  const router = useRouter();

  // ------------ Estados locales para los campos editables ---------------------//
  const [user, setUser] = useState(null);
  console.log(user);
  const [companyData, setCompanyData] = useState(null);
  const { data: companyInfo, isLoading } = useGetCompaniesByIdQuery(
    user?.company.id
  );
  console.log("companyData:", companyInfo);

  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (companyInfo) {
      setCompanyData(companyInfo);
      // Establecer los datos de la empresa en los campos del formulario
      setLocations(companyInfo.locations.id || []);
      setSubcategories(companyInfo.subcategories || []);
      setOrganizationType(companyInfo.organizationType || "");
      // ... (establecer otros campos según la estructura de los datos)
    }
  }, [companyInfo]);

  useEffect(() => {
    const user = getLocalStorage();
    setUser(user);
    getLocation();
    getSubcategories();
    getCategories();
  }, []);

  const organizationTypes = [
    "Organismo Público",
    "Operadora",
    "PyME",
    "Cámara/Cluster/Federación",
    "Profesional independiente",
    "Servicios especiales",
  ];

  //-------------- Funciones para traer las opciones del form --------------//
  const [locationsOptions, setLocationsOptions] = useState([]);
  const [subcategoriesOptions, setSubcategoriesOptions] = useState([]);
  const [subcategorySelected, setSubcategorySelected] = useState([]);
  const [categorySelected, setCategorySelected] = useState([]);
  const [organizationType, setOrganizationType] = useState("");

  const getLocation = async () => {
    try {
      const response = await axios.get(`${urlProduction}/locations`);
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
      const response = await axios.get(`${urlProduction}/categories`);
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
      const response = await axios.get(`${urlProduction}/subcategories`);
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
    setCategorySelected((prevCategories) => {
      if (prevCategories.includes(categoryId)) {
        return prevCategories.filter((id) => id !== categoryId);
      } else {
        return [...prevCategories, categoryId];
      }
    });
    const filteredSubcategories = subcategories.filter(
      (subcategory) => subcategory.categoryId === categoryId
    );
    setSubcategoriesOptions(filteredSubcategories);
    console.log("nuevas opciones de subcat:", filteredSubcategories);
    console.log("categoria seleccionada:", categorySelected);
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
    console.log("locations:", locations);
  };

  const handleFieldUpdate = (field, value) => {
    switch (field) {
      case "locations":
        const locationsArray = Array.isArray(value) ? value : [value];
        setLocations(locationsArray);
        break;
      case "categories":
        setCategories(value);
        break;
      case "subcategories":
        setSubcategories(value);
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
    } else {
      setSubmitError("");
    }

    const updatedData = {};

    if (locations.length > 0) {
      updatedData.locations = locations;
    }
    if (categorySelected.length > 0) {
      updatedData.categories = categorySelected;
    }
    if (subcategorySelected.length > 0) {
      updatedData.subcategories = subcategorySelected;
    }
    if (organizationType.trim() !== "") {
      updatedData.organizationType = organizationType.trim();
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
            onChange={(e) => {
              handleCategoryChange(e);
            }}
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
                    onChange={handleSubcategoryChange}
                  />
                  <span className="ml-2">{option.name}</span>
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
