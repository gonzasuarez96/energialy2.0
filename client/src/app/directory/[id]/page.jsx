"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import CollapsedBar from "./components/collapsedBar";
import { axiosGetDetailCompany } from "@/app/Func/axios";
import Chat from "@/app/components/Chat";

const Page = ({ params: { id } }) => {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    if (id) {
      axiosGetDetailCompany(id, setCompany);
    }
  }, [id]);

  if (!company) return "loading...";

  return (
    <div className="md:max-w-[70%] m-auto">
      <div className="flex justify-center mt-10">
        <div className="relative w-full h-1/2">
          <Image
            className="object-cover max-h-[60%]"
            src={company.bannerPicture}
            alt="Company banner picture"
            layout="fill"
          />
        </div>
      </div>

      <div className="mt-20">
        <CollapsedBar title="Compañía" company={company} intState={false} />
        <CollapsedBar title="Licitaciones" company={company} intState={true} />
      </div>

      <Chat id={id} company={company} />
    </div>
  );
};

export default Page;
