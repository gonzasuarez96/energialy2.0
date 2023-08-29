import Image from "next/image";
import background from "@/app/assets/backgroundImageDetail.png";
import DetailCompany from "./components/DetailCompany";



async function page({params}) {

    async function getCompany(id){
      const res = await fetch(`http://localhost:3001/companies/${id}`);
      if(!res.ok) {
        console.log("no se pudo realizar la consulta");
      }
      return res.json();
    }
  const company = await getCompany(params.id);
    
  return (
    <>
      <div className={`flex justify-center`}>
        <div className="fixed w-full h-1/2 object-cover overflow-hidden -z-10">
          <Image src={background} fill={true} />
        </div>
      </div>
      <div className="flex bg-white m-20 rounded-md p-3 justify-between">
        <div>
          <DetailCompany company={company}/>
        </div>
        <div className="border-2">Licitaciones</div>
      </div>
    </>
  );
}

export default page