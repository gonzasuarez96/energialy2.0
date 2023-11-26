'use client'
import CompanyCardContainer from "../components/CompanyCardContainer";
import FilterBar from "../components/FilterBar";
import PaginationComp from "../components/Pagination";
import { setAllCompanies } from "@/app/redux/features/companieSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { urlProduction } from "../data/dataGeneric";

function page() {

 const dispatch = useDispatch();
   
  useEffect(() => {
    fetch(`${urlProduction}/companies`)
      .then((response) => response.json())
      .then((data) => dispatch(setAllCompanies(data)))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  return (
    <>
      <div className="mt-8 mb-0 w-full flex">
        <div className="hidden  md:w-1/3 md:flex  md:justify-center md:mx-4">
          <FilterBar />
        </div>
        <div className="flex flex-col justify-center items-center">
          <CompanyCardContainer />
        </div>
      </div>
    </>
  );
}

export default page