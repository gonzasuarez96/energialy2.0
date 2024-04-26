import Image from "next/image";

function dateTransform(string) {
  const formatDate = new Date(string);
  const optionsDate = { year: "numeric", month: "long", day: "numeric" };
  const date = formatDate.toLocaleDateString(undefined, optionsDate);
  return date;
}

function DetailCompany({company}) {
  
    const date = dateTransform(company.createdAt);
    
  return (
    <>
      <div className="flex mt-2 pt-8 border-t-2 ">
        <div className="flex flex-col justify-center align-middle min-w-[35%]">
          <div className="w-full h-1/2 flex justify-center">
            <Image
              src={company.profilePicture}
              width={200}
              height={200}
            ></Image>
          </div>
          <div className="text-center p-3">
            <h2 className="text-lg font-bold">{company.name}</h2>
          </div>
          {/* <div className="text-sm">
            <p>Comentarios</p>
          </div> */}
          <div className="text-sm">
            <p>Miembro desde, {date}</p>
          </div>
          <div>
            <p className="text-sm">
              <span className="font-bold">Año Fundación:</span>{" "}
              {company.foundationYear}
            </p>
          </div>
          <div>
            <p className="text-sm">
              <span className="font-bold">Ingresos Ultimo Año:</span>{" "}
              {company.annualRevenue}
            </p>
          </div>
        </div>
        <div className="max-w-[40%] flex flex-col px-3">
          <div className="flex justify-center mb-4">
            {company.locations?.map((location) => (
              <div key={location.id} className=" flex m-auto ">
                <div className="w-2 h-2 bg-primary-200 rounded-full mr-1 mt-2 mb-2"></div>
                <p className="text-sm m-auto" key={location.id}>
                  {location.name}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm text-justify">{company.description}</p>
        </div>
        <div className="flex flex-col justify-center min-w-[25%] px-4">
          <div className="min-h-[50%]">
            <span className="font-bold pb-4">Categorias:</span>
            <div className="min-w-full">
              {company.categories?.map((category) => (
                <div key={category.id} className="flex m-auto">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full mr-2 mt-2 mb-2"></div>
                  <p
                    className="text-sm font-semibold my-auto"
                    key={category.id}
                  >
                    {category.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="min-h-[50%]">
            <span className="font-bold pb-4">Sub-Categorias:</span>
            <div className="min-w-full">
              {company.subcategories?.map((subcategory) => (
                <div key={subcategory.id} className="flex m-auto">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full mr-2 mt-2 mb-2"></div>
                  <p
                    className="text-sm font-semibold my-auto"
                    key={subcategory.id}
                  >
                    {subcategory.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailCompany