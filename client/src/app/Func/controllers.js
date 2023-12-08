import axios from "axios";
import { urlProduction } from "../data/dataGeneric";


export function filterData(data, status) {
    const filteredData= data.filter((item) => item.status === status)
    return filteredData;
}

export const handleChangeStatus = async (id, completeStatus, endpoint) => {
  console.log(endpoint)

  console.log('completeStatus:',completeStatus)
  try {
    const accountChange = await axios.put(
      `${urlProduction}/${endpoint}/${id}`,
      completeStatus
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
};

export const bankAccountOpen = async (id) => {
  try {
    const res = await axios.get(`${urlProduction}/companies/${id}`);
    
    if (res && res.data && res.data.bankAccount && res.data.bankAccount.status === 'open') {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false; // Manejo de error: devuelve falso si hay algún error en la solicitud
  }
};


export const calcProfits = (companyId) => {
  /* TODO 
  
    En función del usuario que esta logueado, tengo que traer todas las propuestas que emitió.
    De las propuestas que tengo, tengo que evaluar cuales estan en estado "accepted" => y por cada una que este acepted, enviar el dato del valor de la propuesta a una suma. Esto me da el total de "Ingresos Pendientes"

    Se tiene que incorporar un nuevo estado a Proposals, que sea "ejecutada"

    Verificar todas las propuestas que tengo con estado "ejecutada", hacer lo mismo que la opción anterior, y devolver el dato, esto es el total de "Ingresos"
  */
}


export const calcInvestments = () => {

  /* TODO

    En función del usuario logueado, traer todas las Licitaciones. 
    Filtrar las licitaciones que esten adjudicadas. 
    En cada licitación adjudicata, verificar el estado de la propuesta: 
      Si el estado es "accepted" => sumarla para "inversiones pendientes"
      Si el estado es "ejecutada" => sumarla para "Inversiones"
  
  */




}