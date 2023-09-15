import { useSelector } from "react-redux"
import CardTenderDetail from './CardTenderDetail'

function TendersCompany({company}) {
   
  return (
    <div>
        <CardTenderDetail item={company}/>
    </div>
  )
}

export default TendersCompany