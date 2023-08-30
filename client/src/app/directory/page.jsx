import CompanyCardContainer from "../components/CompanyCardContainer";
import FilterBar from "../components/FilterBar";
import PaginationComp from "../components/Pagination";

async function getCompanies(){
  const res = await fetch("http://localhost:3001/companies", {next: { revalidate: 1 }});
  const data = await res.json()
  
  if (!res.ok) {
    console.log("no se pudo realizar la consulta");
  }
  
  return data;
}

async function page() {

  const companies = await getCompanies()

  return (
    <>
      <div className="mt-8 mb-0 w-full flex">
        <div className="hidden  md:w-1/3 md:flex md:justify-center md:mx-4">
          <FilterBar />
        </div>
        <div className="flex flex-col justify-center items-center">
          <CompanyCardContainer data={companies}/>
          <PaginationComp />
        </div>
      </div>
    </>
  );
}

export default page