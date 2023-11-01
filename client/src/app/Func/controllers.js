import axios from "axios";



export function filterData(data, status) {
    const filteredData= data.filter((item) => item.status === status)
    return filteredData;
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