"use client";
import React, { useState, useEffect, useRef  } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  displayFailedMessage,
  displaySuccessMessage,
} from "../../../components/Toastify";

import getLocalStorage from "@/app/Func/localStorage";
import { getCompanyId } from "@/app/Func/sessionStorage";

import { 
  axiosPostCompanyGallery,
  axiosGetImageCount,
 } from "@/app/Func/axios";

export default function AgregarImagen() {
  const [user, setUser] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const [galleryImage, setGalleryImage] = useState(null);
  const [galleryDescription, setGalleryDescription] = useState("");
  const [galleryError, setGalleryError] = useState("");
  const [imageCount, setImageCount] = useState(0);
  //const fileInputRef = useRef(null); // Referencia al input del archivo

  useEffect(() => {
    const userData = getLocalStorage();
    if (userData) {
      setUser(userData);
    }
  }, []);

  const companyId = getCompanyId();

  // Obtener el número de imágenes existentes para la compañía al montar el componente
  useEffect(() => {
    const fetchImageCount = async () => {
      try {  
        const count = await axiosGetImageCount(companyId);
        setImageCount(count);
      } catch (error) {
        console.error("Error al obtener el número de imágenes: ", error);
      }
    };

    fetchImageCount();
  }, [companyId]);

  const handleGalleryUpload = async (e) => {
    e.preventDefault();

    if (!galleryImage) {
      setGalleryError("Debes seleccionar una imagen.");
      return;
    }
    if (!galleryDescription) {
      setGalleryError("Debes proporcionar una descripción.");
      return;
    }

    setLoading(true);
    setGalleryError("");

    try {
      await axiosPostCompanyGallery(galleryDescription, companyId, [galleryImage]);
      displaySuccessMessage("Imagen de la galería cargada con éxito");

      // Actualizar el contador de imágenes
      setImageCount(prevCount => prevCount + 1);

      // Resetear los campos
      setGalleryImage(null);
      setGalleryDescription("");
      setIsEdited(true);
      //fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error al cargar imagen de la galería: ", error);
      setGalleryError("Error al cargar la imagen de la galería");
      displayFailedMessage("Error al cargar la imagen de la galería");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelUpload = () => {
    setGalleryImage(null);
    setGalleryDescription("");
    setGalleryError("");
  };

  return (
    <div className="p-5 m-2">
      <div>
        <div className="mb-3">
          <label
            htmlFor="galleryImage"
            className="block font-bold mb-2 bg-[#fcfcfc] p-2 border-l-4 border-primary-500"
          >
            Imagen de la Galería
          </label>
          <input
            type="file"
            id="galleryImage"
            accept="image/*"
            onChange={(e) => setGalleryImage(e.target.files[0])}
            className="w-full border rounded px-2 py-1"
            disabled={imageCount >= 4}
          />
          <label
            htmlFor="galleryDescription"
            className="block font-bold mb-2 bg-[#fcfcfc] p-2 border-l-4 border-primary-500 mt-2"
          >
            Descripción de la Imagen
          </label>
          <input
            type="text"
            id="galleryDescription"
            value={galleryDescription}
            onChange={(e) => setGalleryDescription(e.target.value)}
            className="w-full border rounded px-2 py-1"
            disabled={imageCount >= 4}
          />
          {galleryError && (
            <p className="text-red-500 text-sm">{galleryError}</p>
          )}
        </div>

        {loading ? (
          <h3>Cargando Producto/Servicio...</h3>
        ) : (
          <>
            {galleryImage && (
              <div className="border shadow-lg p-4 mb-4">
                <div className="flex justify-center mb-4">
                  {galleryImage && (
                    <img
                      src={URL.createObjectURL(galleryImage)}
                      style={{ width: "300px" }}
                      alt="Imagen de la galería"
                    />
                  )}
                </div>
                <div className="text-center">
                  <p>{galleryDescription}</p>
                </div>
              </div>
            )}
          </>
        )}

        {imageCount >= 4 && (
          <p className="text-red-500 text-[16px] font-bold mb-3">
            Has alcanzado el límite de 4 imágenes en la galería.
          </p>
        )}

        <div className="p-4 flex justify-center">
          <button
            onClick={handleGalleryUpload}
            className="px-4 py-2 text-white bg-[#191654] rounded hover:bg-secondary-600 transition duration-300"
            disabled={imageCount >= 4}
          >
            Cargar a la Galería
          </button>
          {galleryImage && (
            <button
              onClick={handleCancelUpload}
              className="ml-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition duration-300"
            >
              Cancelar Carga
            </button>
          )}
        </div>
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