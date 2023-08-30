import Image from "next/image";

function dateTransform(string) {
  const formatDate = new Date(string);
  const optionsDate = { year: "numeric", month: "long", day: "numeric" };
  const date = formatDate.toLocaleDateString(undefined, optionsDate);
  return date;
}

function DetailCompany({company}) {
    const date = dateTransform(company.createdAt);
    console.log(company)
  return (
    <>
      <div className="flex">
        <div className="flex flex-col justify-center align-middle p-2">
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
          <div className="text-sm">
            <p>Comentarios</p>
          </div>
          <div className="text-sm">
            <p>Miembro desde, {date}</p>
          </div>
          <div>
            <p className="text-sm">
              <span className="font-bold">Año Fundación:</span> 2002
            </p>
          </div>
          <div>
            <p className="text-sm">
              <span className="font-bold">Ingresos Ultimo Año:</span> 0
            </p>
          </div>
        </div>
        <div>
          <p>{company.description}</p>
        </div>
      </div>
    </>
  );
}

export default DetailCompany