'use client'
import React, { useState } from 'react';
import Head from "./components/head"
import SoloFirmaLoan from './components/soloFirmaLoan';
import GarantLoan from './components/garantLoan';
import ECheq from './components/eCheq';

const productos = [
    "Prestamo a sola firma",
    "Prestamo con garantia",
    "E-Cheqs",
];

export default function ProductosPage() {
    
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    const handleProductoClick = (producto) => {
        setProductoSeleccionado(producto);
    }

    return(
        <main className="w-full h-100 bg-white ml-4 shadow">
            <Head onProductoClick={handleProductoClick} products={productos}/>
            <div className="mx-2 mt-4 pl-4">
                {productoSeleccionado === "Prestamo a sola firma" && <SoloFirmaLoan />}
                {productoSeleccionado === "Prestamo con garantia" && <GarantLoan />}
                {productoSeleccionado === "E-Cheqs" && <ECheq />}
            </div>
        </main>
    )
}

