import CardTender from "./CardTender"
import PaginationOption from "./PaginationOption"
import { setAllTenders } from "../redux/features/tenderSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function TenderContainer({data}) {
    const dispatch = useDispatch()

    const filterTenders = useSelector((state) => state.tender.filterTenders)
    const userData = useSelector((state) => state.user.userData);
    const tenderFilteredByUser = filterTenders.filter((tender) => tender.company.id !== userData.company.id)
    
    useEffect(()=> {
        dispatch(setAllTenders(data))
    }, [])
    
  return (
    <div className="flex flex-col w-full gap-3 items-center mb-4">
      {tenderFilteredByUser.length > 0 ? tenderFilteredByUser?.map((item) => (
        <CardTender key={item.id} item={item} />
      )): (<h1>No existen Licitaciones</h1>)}
      <PaginationOption data={filterTenders} />
    </div>
  );
}

export default TenderContainer