'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import background from "@/app/assets/backgroundImageDetail.png";

import CollapsedBar from "../components/collapsedBar";





function page({params}) {
  
  const [company, setCompany] = useState({})
  console.log(company
    )
  const id = params.id

  
  useEffect(()=> {
    fetch(`http://localhost:3001/companies/${id}`)
      .then((response) => response.json())
      .then((data) => setCompany(data))
      .catch((error) => console.error("Error fetching data:", error));
  },[])
  

    
  return (
    <>
      <div className={`flex justify-center`}>
        <div className="fixed w-full h-1/2 object-cover overflow-hidden -z-10">
          <Image src={background} fill={true} />
        </div>
      </div>


      <div>
        <CollapsedBar title={"Compañía"} company={company} />
        <CollapsedBar title={"Servicios"} company={company} />
        <CollapsedBar title={"Portfolio"} company={company} />
        <CollapsedBar title={"Licitaciones"} company={company} />

      </div>
    </>
  );
}

export default page