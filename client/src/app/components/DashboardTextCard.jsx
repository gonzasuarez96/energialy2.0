import React from 'react'

function DashboardTextCard({title, content}) {
  return (
    <div className='shadow-md flex flex-col w-full'>
        <p className='text-sm text-gray-500 font-semibold ml-0 p-2'>{title}</p>
        <p className='text-center text-green-500 text-lg'>{content}</p>
    </div>
  )
}

export default DashboardTextCard