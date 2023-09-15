import CardTender from "./CardTender"
import PaginationOption from "./PaginationOption"
import { setAllTenders } from "../redux/features/tenderSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function TenderContainer({data}) {
    const dispatch = useDispatch()
    
    const filterTenders = useSelector((state) => state.tender.filterTenders)

    useEffect(()=> {
        dispatch(setAllTenders(data))

    }, [])
  return (
    <div className="flex flex-col w-full gap-3 items-center mb-4">
      {filterTenders?.map((item) => (
        <CardTender key={item.id} item={item} />
      ))}
      <PaginationOption data={filterTenders}/>
    </div>
  );
}

export default TenderContainer