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

export default function Imagenes() {
  const router = useRouter();

  // ------------ Estados locales para los campos editables ---------------------//
  const [user, setUser] = useState(null);
  console.log(user);
  const [companyData, setCompanyData] = useState(null);
  const { data: companyInfo, isLoading } = useGetCompaniesByIdQuery(
    user?.company.id
  );
  console.log("companyData:", companyInfo);
  const [isEdited, setIsEdited] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (companyInfo) {
      setCompanyData(companyInfo);
    }
  }, [companyInfo]);

  useEffect(() => {
    const user = getLocalStorage();
    setUser(user);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aquí puedes enviar los datos actualizados al servidor
    if (!isEdited) {
      setSubmitError("Debes realizar alguna modificacion.");
      return;
    }

    const updatedData = {};

    if (profilePicture) {
      updatedData.profilePicture = profilePicture;
    }
    if (bannerPicture) {
      updatedData.bannerPicture = bannerPicture;
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
        "https://api.cloudinary.com/v1_1/dkgpfpz6o/image/upload",
        data
      );
      const file = res.data;
      console.log("Respuesta de cloudinary:", res);

      if (imageType === "profile") {
        setProfilePicture(file.secure_url);
        setIsEdited(true)
      } else if (imageType === "banner") {
        setBannerPicture(file.secure_url);
        setIsEdited(true)
      }

      setLoading(false);
    } catch (error) {
      console.log("Error al cargar la imagen:", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-5 m-2">
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
            onChange={(e) => {
              uploadImage(e, "profile");
            }}
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
            onChange={(e) => {
              uploadImage(e, "banner");
            
            }}
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
