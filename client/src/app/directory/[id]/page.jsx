import Image from "next/image";

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
    <div className="flex justify-center">
      <div className="w-[40px] flex items-center justify-center">
        <Image src={company.bannerPicture} fill={true} className="w-full" />
      </div>
      <div>{company.name}</div>
      <div>{company.description}</div>
    </div>
  );
}

export default page