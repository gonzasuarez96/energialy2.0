import React, { useState } from "react";
import Image from "next/image";

function FilesCard({ imageUrl, description, openModal, onSaveDescription, onDelete, id }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(description);

  const handleImageClick = () => {
    openModal(imageUrl);
  };

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(id);
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onSaveDescription(id, newDescription);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewDescription(description);
  };

  return (
    <>
      <div className="w-[320px] h-[250px] flex flex-col rounded-md bg-white shadow-md hover:shadow-2xl cursor-pointer">
        <div className="flex w-full h-1/2 rounded-tr-md rounded-tl-md">
          <Image
            className="rounded-tr-md rounded-tl-md w-full h-full object-cover"
            src={imageUrl}
            width={320}
            height={220}
          />
        </div>

        <div className="w-full mt-2 pt-2 flex justify-center">
          {isEditing ? (
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
            />
          ) : (
            <h3 className="text-lg hover:text-secondary-500">
              {description}
            </h3>
          )}
        </div>

        <div className="flex justify-around mt-2">
          <button
            className="bg-blue-700 text-white px-2 py-1 rounded hover:bg-blue-900"
            onClick={handleImageClick}
          >
            Ampliar
          </button>
          {isEditing ? (
            <>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={handleSaveClick}
              >
                Guardar
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={handleCancelEdit}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
              onClick={handleEditClick}
            >
              Editar
            </button>
          )}
          <button
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
            onClick={handleDeleteClick}
          >
            Eliminar
          </button>
        </div>

        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-gray-50 p-4 rounded shadow-md relative z-10">
              <p>¿Estás seguro de que quieres eliminar este Producto/Servicio?</p>
              <div className="flex justify-around mt-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-800"
                  onClick={confirmDelete}
                >
                  Confirmar
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                  onClick={cancelDelete}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-2xl mx-4 relative z-10">
              <h2 className="text-xl font-bold mb-4">Editar Descripción</h2>
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mb-4"
                placeholder="Ingrese la nueva descripción..."
              />
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={handleSaveClick}
                >
                  Guardar
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                  onClick={handleCancelEdit}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FilesCard;