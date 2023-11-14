import React, { useState } from 'react';

export default function Head({ onProductoClick, products }) {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const handleProductoClick = (producto) => {
    setProductoSeleccionado(producto);
    onProductoClick(producto);
  }

  return (
    <div className="pl-4 m-2">
      <label className="font-bold w-full p-4 mb-2 text-xl">Solicitud de Productos</label>
      <label className="w-full p-3 mb-2">Seleccionar: </label>
      <div className="">
        {products.map((producto, index) => (
          <button
            key={index}
            className={`bg-${productoSeleccionado === producto ? 'secondary-600' : 'primary-600'} text-white font-bold py-2 px-4 m-2 transition duration-300`}
            onClick={() => handleProductoClick(producto)}
          >
            {producto}
          </button>
        ))}
      </div>
    </div>
  );
}
