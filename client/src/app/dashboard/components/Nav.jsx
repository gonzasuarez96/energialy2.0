'use client'
import React, { useState } from 'react';
import EditCompany from '../ajustesEmpresa/components/EditCompany';

export default function Nav({ options, onClick }) {
  const [selectedOption, setSelectedOption] = useState(null);
  console.log('Opciones:',options)

  const handleItemClick = (option, index) => {
    onClick(index);
    setSelectedOption(index);
    console.log('option:',option,'index:',index)
  }

  return (

    <div className="w-full w-1/4 h-100 bg-[#fcfcfc]">
      <div> 
        {options.map((option, index) => (
          <div key={index} className="mb-4">
            <div
              
              className={`block no-underline font-bold text-gray-400 pl-5 pr-auto border-primary-500 pt-3 pb-3 transition duration-300 ${
                selectedOption === index
                  ? 'border-l-4 bg-white text-primary-500'
                  : 'hover:border-l-4 hover:bg-white hover:text-primary-500'
              }`}
              onClick={() => handleItemClick(option, index)}
            >
              {option}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
