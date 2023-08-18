import CompanyCard from "../components/CompanyCard"
import FilterBar from "../components/FilterBar";
import PaginationComp from "../components/Pagination";

function page() {
  return (
    <>
      <div className="mt-8 mb-0 w-full flex">
        <div className="hidden  md:w-1/3 md:flex md:justify-center md:mx-4">
          <FilterBar />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center">
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
          </div>
          <PaginationComp />
        </div>
      </div>
    </>
  );
}

export default page