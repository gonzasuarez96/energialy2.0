import axios from "axios";



export function filterAccount(bankAccounts, status) {
    const filteredAccounts = bankAccounts.filter((account) => account.status === status)
    return filteredAccounts
}

export const handleChangeStatus = async (id, status, endpoint) => {
  console.log(endpoint)
  console.log(status)
  try {
    const accountChange = await axios.put(
      `http://localhost:3001/${endpoint}/${id}`,
      status
    );
    
    console.log(accountChange)
  } catch (error) {
    
    console.log(error);
  }
};