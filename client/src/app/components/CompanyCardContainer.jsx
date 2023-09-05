'use client'
import { useState } from 'react';
import CompanyCard from './CompanyCard';
import { useSelector } from 'react-redux';

import { useGetCompaniesQuery } from '@/app/redux/services/companiesApi';
import Pagination from "react-bootstrap/Pagination";


function CompanyCardContainer() {
  
  const [currentPage, setCurrentPage] = useState(1);
  const cardPerPage = 6;
  const lastIndex = cardPerPage * currentPage;
  const firstIndex = lastIndex - cardPerPage;
  
  const filterCompanies = useSelector((state) => state.company.filterCompanies);
  
  const cardsCompanies = filterCompanies.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filterCompanies.length / cardPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  
  function changePage(page){
    if(page < 1){
      page = 1;
    }
    if(page > npage){
      page = npage;
    }
    setCurrentPage(page)
  }




  const { isLoading } = useGetCompaniesQuery();



  return (
    <div>
      {isLoading ? (
        <h1>Cargando...</h1>
      ) : (
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center">
          {filterCompanies.length > 0 ? (
            cardsCompanies?.map((comp) => (
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
        <Pagination>
          <Pagination.First onClick={() => changePage(1)} />
          <Pagination.Prev onClick={() => changePage(currentPage - 1)}/>
          <Pagination.Item>{1}</Pagination.Item>

          {currentPage > 1 ? (
            <Pagination.Item>{currentPage - 1}</Pagination.Item>
          ) : (
            <Pagination.Ellipsis />
          )}
          {numbers.map((number, i) => (
            <Pagination.Item key={i} active={number === currentPage} onClick={() => changePage(i)}>
              {number}
            </Pagination.Item>
          ))}

          {currentPage < npage ? (
            <Pagination.Item>{currentPage + 1}</Pagination.Item>
          ) : (
            <Pagination.Ellipsis />
          )}
          <Pagination.Item>{npage}</Pagination.Item>
          <Pagination.Next onClick={() => changePage(currentPage + 1)}/>
          <Pagination.Last onClick={() => changePage(npage)} />
        </Pagination>
      </div>
    </div>
  );
}

export default CompanyCardContainer