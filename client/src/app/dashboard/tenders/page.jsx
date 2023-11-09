'use client'
import Link from "next/link";
import { useGetTendersQuery } from "@/app/redux/services/tendersApi";
import { useSelector } from "react-redux";
import CardTender from "@/app/components/CardTender";
import CardUserTender from "@/app/components/CardUserTender";
import getLocalStorage from "@/app/Func/localStorage";
import PaginationComponent from "@/app/components/PaginationComponent";
import { useState } from "react";





function Licitaciones() {
  const userData = getLocalStorage();
  const { data: tenders, isLoading } = useGetTendersQuery();
  const [currentPage, setCurrentPage] = useState(1);

  //console.log(tenders)
  const userTenders = !isLoading
    ? tenders.filter((tender) => tender.company.id === userData.company.id)
    : [];

  const itemsPerPage = 4;
  const totalPages = Math.ceil(userTenders.length / itemsPerPage);
  console.log(userTenders);
  // Calcula las compañías que se mostrarán en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const tendersUserToShow = userTenders.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col items-center">
      {!isLoading ? (
        <div className="flex flex-col justify-center items-center text-3xl font-bold mt-10 mb-5 gap-4">
          {userTenders.length === 0 ? (
            <div className="flex flex-col justify-center items-center font-bold mt-10 mb-5 gap-4">
              <h1>Todavía no hay licitaciones creadas.</h1>
              <Link
                href="/dashboard/tenders/createTender"
                className="text-white"
              >
                <button className="bg-primary-600 rounded-md p-4 text-base">
                  Crear tu primera Licitación
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <h1 className="w-full text-center mb-4">Licitaciones Actuales</h1>
              <Link
                href="/dashboard/tenders/createTender"
                className="text-white"
              >
                <button className="bg-primary-900 rounded-md p-4 text-base w-full mb-4 hover:bg-primary-700">
                  Crear una Nueva Licitación
                </button>
              </Link>
              <div>
                {tendersUserToShow.map((tender) => (
                  <CardUserTender item={tender} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <h1>Cargando...</h1>
      )}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Licitaciones