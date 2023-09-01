'use client'
import { useState, useEffect } from "react";
import Image from "next/image";

import CollapsedBar from "./components/collapsedBar";
import { setAllCompanies } from "@/app/redux/features/companieSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function page({params}) {
  const dispatch = useDispatch()
  const companies = useSelector((state) => state.companies)
  const [company, setCompany] = useState({})
  const id = params.id

  
  useEffect(() => {
    fetch(`http://localhost:3001/companies/${id}`)
      .then((response) => response.json())
      .then((data) => setCompany(data))
      .catch((error) => console.error("Error fetching data:", error));
    
  }, []);
    
  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="w-full h-1/2 object-cover overflow-hidden -z-10">
          <Image className="max-h-[60%]" src={company.bannerPicture} fill={true} />
        </div>
      </div>

      <div className="mt-20">
        <CollapsedBar title={"Compañía"} company={company} intState={false} />
        <CollapsedBar title={"Servicios"} company={company} intState={true} />
        <CollapsedBar title={"Portfolio"} company={company} intState={true} />
        <CollapsedBar
          title={"Licitaciones"}
          company={company}
          intState={true}
        />
      </div>
    </>
  );
}

export default page