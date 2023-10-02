'use client'
import ProposalContainer from '@/app/dashboard/proposals/ProposalContainer'
import { useGetProposalsQuery } from '@/app/redux/services/ProposalApi'

function Propuestas() {
  
  const {data:proposals, isLoading} = useGetProposalsQuery()
  
  return (
    <>
      {isLoading ? (
        <h1>"Loading..."</h1>
      ) : (
        <ProposalContainer proposals={proposals} />
      )}
    </>
  );
  //return <h1>Propuestas</h1>
}

export default Propuestas