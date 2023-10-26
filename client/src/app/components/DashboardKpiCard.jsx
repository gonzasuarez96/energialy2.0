import React from 'react'

function DashboardKpiCard({ title, content }) {
    const evalContent = content?.filter((item) => item.status === "sent") || [];
    const aceptContent = content?.filter((item) => item.status === "accepted") || [];
    const declineContent = content?.filter((item) => item.status === "declined") || [];
    
  return (
    <div className="shadow-md flex flex-col w-full">
      <p className="text-sm text-gray-500 font-semibold ml-0 p-2">{title}</p>
      <div className="flex justify-evenly">
        <div className="flex flex-col justify-center items-center">
          <div className="border-3 border-primary-500 w-16 h-16 rounded-full flex justify-center items-center">
            <span className="text-primary-500 font-semibold">
              {evalContent.length > 0 ? evalContent.length : "-"}
            </span>
          </div>
          <p className="text-xs text-gray-500 font-semibold ml-0 p-2">
            Evaluando
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="border-3 border-green-500 w-16 h-16 rounded-full flex justify-center items-center">
            <span className="text-green-500 font-semibold">
              {aceptContent.length > 0 ? aceptContent.length : "-"}
            </span>
          </div>
          <p className="text-xs text-gray-500 font-semibold ml-0 p-2">
            Aceptadas
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="border-3 border-red-500 w-16 h-16 rounded-full flex justify-center items-center">
            <span className="text-red-500 font-semibold">
              {declineContent.length > 0 ? declineContent.length : "-"}
            </span>
          </div>
          <p className="text-xs text-gray-500 font-semibold ml-0 p-2">
            Canceladas
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardKpiCard