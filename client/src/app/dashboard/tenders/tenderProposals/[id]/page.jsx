'use client'
import { useGetTenderByIdQuery } from "@/app/redux/services/tendersApi"
import getLocalStorage from "@/app/Func/localStorage"
import { useRouter } from "next/navigation";

function page({params}) {
  const { data:tender, isLoading, isError } = useGetTenderByIdQuery(params.id);
  console.log(tender)
  
  console.log(params)
  const router = useRouter()
  return (
    <>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <p>
            Licitacion: <span className="font-bold">{tender.title}</span>
          </p>
          <p>
            Vencimiento:{" "}
            <span className="font-bold">{tender.validityDate}</span>
          </p>
          <div>
          {tender.proposals?.map((proposal) => (<div>{proposal.item}</div>))}
          </div>
        </div>
      )}
      <button onClick={router.back()}>Volver</button>
    </>
  );
}

export default page