import GalleryCardContainer from '@/app/components/Modals/GalleryCardContainer';
import ModalImage from '@/app/components/Modals/imageModal';
import React, { useState } from "react";
const GalleryCompany = ({ gallery }) => {
//modal
const [modalOpen, setModalOpen] = useState(false); 
const [selectedImage, setSelectedImage] = useState(null); 

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

if (gallery == null) {
  return (
    <div className="gallery flex flex-col bg-white m-4 rounded-md p-3 justify-between">
      <div className="text-center text-gray-500">La compañía no posee Productos/Servicios</div>
    </div>
  );
}

  return (

<div className="gallery flex flex-col bg-white m-4 rounded-md p-3 justify-between">
  {gallery.length > 0 ? (
    <div className="mt-8 mb-0">
      <div className="flex flex-wrap justify-center">
        <GalleryCardContainer gallery={gallery} openModal={openModal} />
      </div>
    </div>
  ) : (
    <div>Cargando imágenes...</div>
  )}
  {modalOpen && selectedImage && ( 
        <ModalImage imageUrl={selectedImage} onClose={closeModal} /> 
      )}
</div>
  );
};

export default GalleryCompany;