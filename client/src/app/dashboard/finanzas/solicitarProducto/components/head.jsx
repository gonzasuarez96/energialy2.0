import React, { useState } from "react";

export default function Head({ onProductoClick, products }) {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const handleProductoClick = (producto) => {
    setProductoSeleccionado(producto);
    onProductoClick(producto);
  };

  return (
    <div  className="pl-4 m-2">
      <div className="flex">
        {/* Columna izquierda */}
        <div className="w-1/2 m-2">
          <div className="pl-2 m-2">
            <label className="font-bold w-full p-4 mb-2 text-xl">
              Solicitud de Productos
            </label>
            <label className="w-full p-3 mb-2">Seleccionar: </label>
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <img
            src="https://res.cloudinary.com/dbraa6jpj/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1700056668/WhatsApp_Image_2023-11-14_at_8.21.53_PM_i53viw.jpg?_s=public-apps"
            alt="Imagen"
            className="w-full"
            style={{ width: "300px" }}
          />
        </div>
      </div>
      <div className="">
        {products.map((producto, index) => (
          <button
            key={index}
            className={`bg-${
              productoSeleccionado === producto
                ? "secondary-600"
                : "primary-600"
            } text-white font-bold py-2 px-4 m-2 transition duration-300`}
            onClick={() => handleProductoClick(producto)}
          >
            {producto}
          </button>
        ))}
      </div>
    </div>
  );
}
