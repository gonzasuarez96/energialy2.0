'use client'
import { useState, useEffect } from "react";
import DetailCompany from "./DetailCompany";
import TendersCompany from "./TendersCompany";

function CollapsedBar({title, company, intState }) {
     const [isCollapsed, setIsCollapsed] = useState(intState);
     const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <>
      <div className=" flex flex-col bg-white m-4 rounded-md p-3 justify-between ">
        <div className=" flex justify-between">
          <h3 className="text-sm h-full my-auto">{title}</h3>
          <button
            className=" text-primary-600 px-2 py-1 rounded"
            onClick={toggleCollapse}
          >
            {isCollapsed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            )}
          </button>
        </div>
        <div className={`${isCollapsed ? "hidden" : "block"}`}>
          {title === 'Compañía' ? <DetailCompany company={company} /> : title === 'Licitaciones' ? <TendersCompany company={company}/> : null }
          
          
        </div>
      </div>
    </>
  );
}

export default CollapsedBar