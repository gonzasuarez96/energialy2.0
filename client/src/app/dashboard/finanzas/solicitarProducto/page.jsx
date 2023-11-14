'use client'
import React, { useState } from 'react';
import Head from "./components/head"
import SoloFirmaLoan from './components/soloFirmaLoan';
import GarantLoan from './components/garantLoan';
import ECheq from './components/eCheq';
import CheqThird from './components/cheqThird';
import OwnCheq from './components/ownCheq';
import FacturaCredito from './components/facturaCreditoElect';

const productos = [
    "Prestamo a sola firma",
    "Prestamo con garantia",
    "E-Cheqs",
    "Cheques a Terceros",
    "Cheques Propios",
    "Factura de Credito Electronica"
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
                {productoSeleccionado === "Cheques a Terceros" && <CheqThird />}
                {productoSeleccionado === "Cheques Propios" && <OwnCheq />}
                {productoSeleccionado === "Factura de Credito Electronica" && <FacturaCredito />}
            </div>
        </main>
    )
}

