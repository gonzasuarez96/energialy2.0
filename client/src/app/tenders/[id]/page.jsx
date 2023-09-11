'use client'
import { useGetTenderByIdQuery } from "@/app/redux/services/tendersApi"

function TenderDetail({params}) {
  const tenderId = params.id
  
  const {data, isLoading} = useGetTenderByIdQuery(tenderId)
  //console.log(data)
  return (
    <div>
        {isLoading ? <h1>Loading...</h1> : <h1>{data.company.name}</h1>}
    </div>
  )
}

export default TenderDetail