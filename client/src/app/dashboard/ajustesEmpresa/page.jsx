import React from 'react'
import Nav from '../ajustesProfile/components/Nav'

const optionsNav = [
  'Opcion 1',
  'Opcion 2',
  'Opcion 3',
  'Opcion 4',
  'Opcion 5',
]

function pageProfileCompany() {
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

export default pageProfileCompany