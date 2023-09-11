"use client";
import { useState } from "react";
import { useSelector } from "react-redux";

function PaginationOption({data}) {
    
    const [currentPage, setCurrentPage] = useState(1);
    const cardPerPage = 1;
    const lastIndex = cardPerPage * currentPage;
    const firstIndex = lastIndex - cardPerPage;
  
    const npage = Math.ceil(data.length / cardPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
    const cardTenders = data.slice(firstIndex, lastIndex);
    function changePage(page) {
      if (page < 1) {
        page = 1;
      }
      if (page > npage) {
        page = npage;
      }
      setCurrentPage(page);
    }
  return (
    <nav aria-label="Page navigation example">
      <ul class="list-style-none flex">
        <li>
          <a
            class="pointer-events-none relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400"
            onClick={() => changePage(currentPage - 1)}
          >
            Previous
          </a>
        </li>
        {numbers.map((number, i) => (
          <li
            key={i}
            active={number === currentPage}
            onClick={() => changePage(i)}
            aria-current="page"
          >
            <a
              class="relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              href="#!"
            >
              {number}
              <span class="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
                (current)
              </span>
            </a>
          </li>
        ))}

        <li>
          <a
            class="relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            href="#!"
            onClick={() => changePage(currentPage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default PaginationOption;
