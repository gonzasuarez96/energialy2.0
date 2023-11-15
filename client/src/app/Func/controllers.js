import axios from "axios";
import { urlProduction } from "../data/dataGeneric";


export function filterData(data, status) {
    const filteredData= data.filter((item) => item.status === status)
    return filteredData;
}

export const handleChangeStatus = async (id, status, endpoint) => {
  console.log(endpoint)
  console.log(status)
  try {
    const accountChange = await axios.put(
      `${urlProduction}/${endpoint}/${id}`,
      status
    );
    
    console.log(accountChange)
  } catch (error) {
    
    console.log(error);
  }
};


export const chekAuth = async (item, role) => {

  console.log(item)
  console.log(role)
  const showItem = await item.auth.includes(role)
  return showItem;
}