import axios from "axios";

export async function changeProposalState(id, status) {
    console.log("id:", id)
    console.log("state:", status)
    try {
        const proposalChange = await axios.put(
          `http://localhost:3001/proposals/${id}`,
          status
        );
        console.log(proposalChange.data)
    } catch (error) {
        console.log(error)
    }
}