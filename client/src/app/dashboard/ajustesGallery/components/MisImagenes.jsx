"use client";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

import getLocalStorage from "@/app/Func/localStorage";
import { getCompanyId } from "@/app/Func/sessionStorage";

import FilesCardContainer from './FilesCardContainer';
import ModalImage from '@/app/components/Modals/imageModal';

import {
  axiosGetGalleryCompanyById,
  axiosDeleteCompanyGalleryById,
  axiosEditCompanyGalleryById,
} from "@/app/Func/axios";

export default function MisImagenes() {

  // ------------ Estados locales para los campos editables ---------------------//
  const [user, setUser] = useState(null);
  
  const [gallery, setGallery] = useState(); 
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const user = getLocalStorage();
    setUser(user);
  }, []);

  const companyId = getCompanyId();

  useEffect(() => {
    if (companyId) {
      axiosGetGalleryCompanyById(companyId, (data) => {
        setGallery(data);
        setLoading(false);
      });
    }
  }, [companyId]);

  if (loading) {
    return <div>Cargando Productos/Servicios...</div>;
  }

// Función para abrir el modal y establecer la imagen seleccionada
const openModal = (imageUrl) => {
  setSelectedImage(imageUrl);
  setModalOpen(true);
};

// Función para cerrar el modal
const closeModal = () => {
  setSelectedImage(null);
  setModalOpen(false);
};
//modal


// Función para eliminar una imagen
const handleDelete = async (id) => {
  await axiosDeleteCompanyGalleryById(id, setGallery);
};


// Función para guardar la descripción de una imagen
const handleSaveDescription = async (id, newDescription) => {
  try {
    await axiosEditCompanyGalleryById(id, newDescription);
    // Actualiza la galería localmente
    setGallery((prevGallery) =>
      prevGallery.map((image) =>
        image.id === id ? { ...image, description: newDescription } : image
      )
    );
  } catch (error) {
    console.error("Error al actualizar la descripción: ", error);
    // Manejar error de actualización aquí
  }
};

if (gallery == null) {
  return (
    <div className="gallery flex flex-col bg-white m-4 rounded-md p-3 justify-between">
      <div className="text-center text-gray-500">No tienes cargado Productos/Servicios</div>
    </div>
  );
}

  return (
    
    <div className="gallery flex flex-col bg-white m-4 rounded-md p-3 justify-between">
  {gallery.length > 0 ? (
    <div className="mt-8 mb-0">
      <div className="flex flex-wrap justify-center">
        <FilesCardContainer
         gallery={gallery}
         openModal={openModal} 
         onDelete={handleDelete}
         onSaveDescription={handleSaveDescription}
          />
      </div>
    </div>
  ) : (
    <div>Cargando Productos/Servicios...</div>
  )}
  {modalOpen && selectedImage && ( 
        <ModalImage imageUrl={selectedImage} onClose={closeModal} /> 
      )}
</div>
  );
}

