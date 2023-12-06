'use client'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function CompanyCard(props) {
  const router = useRouter()
  return (
    <>
      <div className="w-[360px] h-[320px] flex flex-col rounded-md bg-white shadow-md hover:shadow-2xl">
        <div
          className="flex w-full h-1/2  -mb-[45px] rounded-tr-md rounded-tl-md"
        >
          <Image
            className="rounded-tr-md rounded-tl-md"
            src={props.compBanner}
            width={360}
            height={120}
          />
        </div>
        <div className=" flex bg-white mx-auto my-0 z-50 rounded-md min-w-[90px] min-h-[90px]">
          <Image
            width={90}
            height={90}
            className="p-2 shadow rounded-md"
            src={props.compLogo}
          />
        </div>
        <div className="w-full h-1/2 rounded-br-md rounded-bl-md flex flex-col">
          <div
            className="w-full mt-2 pt-2 flex justify-center"
            onClick={() => {
              router.refresh(), router.push(`/directory/${props.compId}`);
            }}
          >
            <h3 className="text-lg cursor-pointer  hover:text-secondary-500">
              {props.compName}
            </h3>
          </div>
          <div className="w-full flex justify-around p-2">
            <Link
              href="/"
              className="border-transparent no-underline  text-gray-800  hover:text-secondary-500 inline-flex items-center px-1 border-b-2 text-sm font-medium "
            >
              Ver Licitaciones
            </Link>
            <Link
              href={`/directory/${props.compId}`}
              className="border-transparent no-underline  text-gray-800  hover:text-secondary-500 inline-flex items-center px-1  border-b-2 text-sm font-medium "
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