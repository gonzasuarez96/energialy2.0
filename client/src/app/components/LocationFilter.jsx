'use client'

import { useGetLocationsQuery } from "@/app/redux/services/locationApi";
import { useState } from "react";
import { fiterCompaniesByLocation } from "@/app/redux/features/companieSlice";
import { useDispatch } from "react-redux";


function LocationFilter() {
  const dispatch = useDispatch();
  const [checkedLocations, setCheckedLocations] = useState([]);
  const {data, error, isLoading} = useGetLocationsQuery()
  
  const handleChecked = (e) => {
  
    if(e.target.checked){
         setCheckedLocations([...checkedLocations, e.target.id]);
          dispatch(
            fiterCompaniesByLocation([...checkedLocations, e.target.id])
          );
      }else{
         setCheckedLocations(
           checkedLocations.filter((id) => id !== e.target.id)
         );
         dispatch(
           fiterCompaniesByLocation(
             checkedLocations.filter((id) => id !== e.target.id)
           )
         );
      }
  }


  return (
    <div>
      {isLoading && <p>Cargando...</p>}
      {data?.map((item) => (
        <div>
          <input
            type="checkbox"
            name="cuenca"
            id={item.id}
            className="mr-2 cursor-pointer peer"
            onChange={handleChecked}
          />
          <label className="peer-checked:text-secondary-500 peer-checked:font-semibold text-sm">
            {item.name}
          </label>
        </div>
      ))}
    </div>
  );
}

export default LocationFilter