'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from '../ajustesProfile/components/Nav'
import EditCompany from "./components/EditCompany";


const optionsNav = [
  'Datos Básicos',
  'Detalles de la Empresa',
  'Imágenes',
  'Tipo de Organización',
]

function pageProfileCompany() {
  return (
    <div className='w-full h-100 bg-white flex ml-4'>
     {/* <div className='w-1/4'>
        <Nav options={optionsNav}/>
      </div> */}
      <div className='flex-1'>
        <EditCompany />
      </div>
    </div>
  )
}

export default pageProfileCompany

