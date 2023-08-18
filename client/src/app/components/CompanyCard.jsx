'use client'
import Image from "next/image";
import Banner from '@/app/assets/banner.jpg'
import CompanyLogo from '@/app/assets/LogoPenzoil.png'
import Link from "next/link";

function CompanyCard() {
  return (
    <>
      <div className="w-[320px] h-[320px] flex flex-col rounded-md bg-white hover:shadow-xl hover:transform hover:scale-120 transition-transform">
        <div className="w-full h-1/2   -mb-[45px] rounded-tr-md rounded-tl-md">
          <Image
            className="w-full h-auto rounded-tr-md rounded-tl-md"
            src={Banner}
          />
        </div>
        <div className="w-[90px] h-[90px] bg-white mx-auto my-0 z-50 rounded-md">
          <Image className="w-full h-auto shadow" src={CompanyLogo} />
        </div>
        <div className="w-full h-1/2  -mt-[45px] rounded-br-md rounded-bl-md flex items-end">
          <h3>Company Name</h3> {/*arreglar la ubicación*/}
          <div className="w-full h-3/4 flex justify-between p-4">
            <Link
              href="/"
              className="border-transparent no-underline  text-gray-800  hover:text-purple-600 inline-flex items-center px-1 pt-1 border-b-2 test-xs font-medium "
            >
              Ver Licitaciones
            </Link>
            <Link
              href="/"
              className="border-transparent no-underline  text-gray-800  hover:text-purple-600 inline-flex items-center px-1 pt-1 border-b-2 test-xs font-medium "
            >
              Ver Perfil
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyCard