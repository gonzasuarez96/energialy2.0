'use client'
import { useGetTenderByIdQuery } from "@/app/redux/services/tendersApi"
import getLocalStorage from "@/app/Func/localStorage"
import { useRouter } from "next/navigation";
import { handleChangeStatus } from "@/app/Func/controllers";

function page({params}) {
  console.log(params)
  const { data:tender, isLoading, isError } = useGetTenderByIdQuery(params.id);
  console.log(tender)
  const endpoint = 'proposals'
  const router = useRouter()
  const backPage = () => {
    router.back()
  }
  return (
    <>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div className="bg-white m-1 p-3 rounded-md">
          <p>
            Licitacion: <span className="font-bold">{tender.title}</span>
          </p>
          <p>
            Vencimiento:{" "}
            <span className="font-bold">{tender.validityDate}</span>
          </p>
          <p>
            Presupuesto: <span className="font-bold">U$S: {tender.budget}</span>
          </p>
          <h4 className="text-center mb-3">Propuestas</h4>
          <div>
            {tender.proposals?.map((proposal) => (
              <div className="p-4 border rounded-md">
                <div>
                  <p>
                    Empresa Oferente:{" "}
                    <span className="font-bold">{proposal.Company.name}</span>
                  </p>
                  <p>
                    Propuesta en U$S:{" "}
                    <span className="font-bold"> {proposal.totalAmount}</span>
                  </p>
                  <p>
                    Duración de la Execución:{" "}
                    <span className="font-bold">
                      {proposal.projectDuration}
                    </span>
                  </p>
                  <p>
                    Estado:{" "}
                    <span className="font-bold">
                      {proposal.status === "sent"
                        ? "Recivida"
                        : proposal.status === "accepted"
                        ? "Aceptada"
                        : "Declinada"}
                    </span>
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    className={`bg-primary-600 rounded-md text-white font-semibold px-3 py-2 disabled: ${
                      proposal.status === "accepted"
                        ? "pointer-events-none opacity-50"
                        : null
                    }`}
                    onClick={() =>
                      handleChangeStatus(
                        proposal.id,
                        { status: "accepted" },
                        endpoint
                      )
                    }
                  >
                    Aceptar
                  </button>
                  <button
                    className={`bg-secondary-700 rounded-md text-white font-semibold px-3 py-2 disabled: ${
                      proposal.status === "declined"
                        ? "pointer-events-none opacity-50"
                        : null
                    }`}
                    onClick={() =>
                      handleChangeStatus(
                        proposal.id,
                        { status: "declined" },
                        endpoint
                      )
                    }
                  >
                    Declinar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            className="bg-primary-600 text-white font-semibold rounded-md p-2 mt-4"
            onClick={backPage}
          >
            Volver
          </button>
        </div>
      )}
    </>
  );
}

export default page