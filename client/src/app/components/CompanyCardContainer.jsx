'use client'
import { useState } from 'react';
import CompanyCard from './CompanyCard';
import { useSelector } from 'react-redux';

import { useGetCompaniesQuery } from '@/app/redux/services/companiesApi';

import PaginationComponent from './PaginationComponent';


function CompanyCardContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const filterCompanies = useSelector((state) => state.company.filterCompanies);

  console.log(PaginationComponent.perPage);
  console.log(filterCompanies);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filterCompanies.length / itemsPerPage);

  // Calcula las compañías que se mostrarán en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const companiesToShow = filterCompanies.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  //const cardsCompanies = filterCompanies.slice(firstIndex, lastIndex);
  //const npage = Math.ceil(filterCompanies.length / cardPerPage);
  //const numbers = [...Array(npage + 1).keys()].slice(1);

  // function changePage(page){
  //   if(page < 1){
  //     page = 1;
  //   }
  //   if(page > npage){
  //     page = npage;
  //   }
  //   setCurrentPage(page)
  // }

  const { isLoading } = useGetCompaniesQuery();

  return (
    <div>
      {isLoading ? (
        <h1>Cargando...</h1>
      ) : (
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center">
          {filterCompanies.length > 0 ? (
            companiesToShow.map((comp) => (
              <CompanyCard
                key={comp.id}
                compBanner={comp.bannerPicture}
                compLogo={comp.profilePicture}
                compName={comp.name}
                compId={comp.id}
              />
            ))
          ) : (
            <h1>No hay companias que coincidan</h1>
          )}
        </div>
      )}
      <div className="flex justify-center">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

      </div>
    </div>
  );
}

export default CompanyCardContainer