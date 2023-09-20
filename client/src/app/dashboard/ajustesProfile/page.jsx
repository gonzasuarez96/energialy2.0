import React from 'react'
import Nav from './components/Nav'
import EditProfile from './components/EditProfile'

const optionsNav = [
  'Datos personales',
]

function pageProfile() {
  return (
    <div className='w-full h-100 bg-white flex ml-4'>
      <div className='w-1/4'>
        <Nav options={optionsNav}/>
      </div>
      <div className='flex-1'>
        <EditProfile />
        {/* Contenido principal aquí */}
      </div>
    </div>
  )
}

export default pageProfile