import ProposalContainer from '@/app/dashboard/proposals/ProposalContainer'

async function Propuestas() {
  
  const proposals = await fetch('http://localhost:3001/proposals')
  const proposalsData =  proposals.json()

  console.log(proposalsData)
  return <ProposalContainer proposals={proposalsData} />;
}

export default Propuestas