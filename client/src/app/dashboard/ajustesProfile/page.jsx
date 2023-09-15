import React from 'react'
import Nav from './components/Nav'

const optionsNav = [
  'Datos personales',
  'Imagen de perfil',
  'Contraseña'
]

function pageProfile() {
  return (
    <div className='w-full h-100 bg-white flex ml-4'>
      <div className='w-1/4'>
        <Nav options={optionsNav}/>
      </div>
      <div className='flex-1'>
        <div>Formulario</div>
        {/* Contenido principal aquí */}
      </div>
    </div>
  )
}

export default pageProfile