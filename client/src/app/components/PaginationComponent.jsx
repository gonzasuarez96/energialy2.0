"use client";

import { ChevronLeft, ChevronRight } from '@/app/components/icons/icons'

function PaginationComponent({ currentPage, totalPages, onPageChange }) {
  

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  
  return (
    <div className="pagination gap-2 my-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${
            currentPage === page ? "bg-primary-600" : "bg-secondary-600"
          }  text-white font-semibold w-6 h-6 flex justify-center items-center rounded-full`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight />
      </button>
    </div>
  );
}

export default PaginationComponent;
