import React from 'react'

function ErrorMensage({message}) {
  return (
    <p className='text-xs text-red-500 font-light '>{message}</p>
  )
}

export default ErrorMensage