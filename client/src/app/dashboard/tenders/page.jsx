'use client'
import Link from "next/link";
import { useGetTendersQuery } from "@/app/redux/services/tendersApi";
import { useSelector } from "react-redux";
import CardTender from "@/app/components/CardTender";


function Licitaciones() {
  const userData = useSelector((state) => state.user.userData);
  const {data:tenders, isLoading} = useGetTendersQuery()

  //console.log(tenders)
  const userTenders = !isLoading ? tenders.filter(tender => tender.company.id === userData.company.id) : []
    
  //console.log(userTenders)


  return (
    <div>
      {!isLoading && userTenders.length > 0 ? <div className="flex flex-col justify-center items-center text-3xl font-bold mt-10 mb-5 gap-4">
        {userTenders.lenght === 0 ? (
          <div>
            <h1>Todavía no hay licitaciones creadas.</h1>
            <Link href="/dashboard/tenders/createTender" className="text-white">
              <button className="bg-primary-600 rounded-md p-4 text-base">
                Crear tu primera Licitación
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <h1>Licitaciones Actuales</h1>
            <div>
              {userTenders.map((tender) => (
                <CardTender item={tender} />
              ))}
            </div>
            <Link href="/dashboard/tenders/createTender" className="text-white">
              <button className="bg-primary-600 rounded-md p-4 text-base">
                Crear una Nueva Licitación
              </button>
            </Link>
          </div>
        )}
      </div>: <h1>Cargando...</h1>}
    </div>
  );
}

export default Licitaciones