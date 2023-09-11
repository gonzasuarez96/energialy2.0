"use client";

import FilterBar from "../components/FilterBar";
import { useGetTendersQuery } from "@/app/redux/services/tendersApi";
import TenderContainer from "../components/TenderContainer";


function page() {
 
  const {data, isLoading} = useGetTendersQuery()

  
    //console.log(data)

  return (
    <>
      <div className="mt-8 mb-0 w-full flex">
        <div className="hidden  md:w-1/3 md:flex  md:justify-center md:mx-4">
          <FilterBar />
        </div>
        <div className="flex flex-col justify-center items-center">
          {
            isLoading ? <h1>Loading...</h1> : <TenderContainer data={data}/>
          }
        </div>
      </div>
    </>
  );
}

export default page;
