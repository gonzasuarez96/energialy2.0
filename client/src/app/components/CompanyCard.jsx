import React from 'react'

function CompanyCard() {
  return (
    <>
      <div className="w-[320px] h-[320px] bg-black flex flex-col">
        <div className="w-full h-1/2  bg-slate-500">imagenBanner</div>
        <div className='w-[90px] h-[90px] bg-blue-800'>LogoCompany</div>
        <div className="w-full h-1/2  bg-slate-100">texto</div>
      </div>
    </>
  );
}

export default CompanyCard