'use client'
import { useGetTendersQuery } from "@/app/redux/services/tendersApi"
import getLocalStorage from "@/app/Func/localStorage"

function page() {
  const userData = getLocalStorage() 
  const { data:tenders, isLoading:tendersLoading, isError } = useGetTendersQuery()

  const userTenders = !tendersLoading
    ? tenders.filter((tender) => tender.company.id === userData.company.id)
    : [];

    console.log(userTenders)


  return (
    <div>listado de propuestas por tender</div>
  )
}

export default page