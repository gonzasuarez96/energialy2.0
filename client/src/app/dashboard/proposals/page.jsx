import ProposalContainer from '@/app/dashboard/proposals/ProposalContainer'
import axios from 'axios'

async function Propuestas() {
  
  // const proposals = await axios.get('http://localhost:3001/proposals')
  // const proposalsData =  await proposals.data  

  //console.log(proposalsData)
  //return <ProposalContainer proposals={proposalsData} />;
  return <h1>Propuestas</h1>
}

export default Propuestas