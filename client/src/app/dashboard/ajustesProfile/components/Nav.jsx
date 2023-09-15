'use client'
import React, { useState } from 'react';

export default function Nav({ options }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClick = (index) => {
    setSelectedOption(index);
  }

  return (
    <div className="w-full h-100 bg-[#fcfcfc]">
      <div>
        {options.map((option, index) => (
          <div key={index} className="mb-4">
            <a
              href="#"
              className={`block no-underline font-bold text-gray-400 pl-5 pr-auto border-primary-500 pt-3 pb-3 transition duration-300 ${
                selectedOption === index
                  ? 'border-l-4 hover:bg-white hover:text-primary-500'
                  : 'hover:border-l-4 hover:bg-white hover:text-primary-500'
              }`}
              onClick={() => handleClick(index)}
            >
              {option}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
