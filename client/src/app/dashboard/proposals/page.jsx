import ProposalContainer from '@/app/dashboard/proposals/ProposalContainer'
import axios from 'axios'

async function Propuestas() {
  
  const proposals = await axios.get('http://localhost:3001/proposals')
  const proposalsData =  proposals.json()

  console.log(proposalsData)
  return <ProposalContainer proposals={proposalsData} />;
}

export default Propuestas