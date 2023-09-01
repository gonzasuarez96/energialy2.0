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
    const locationId = e.target.id;
    // Verificar si la ubicación ya está seleccionada
    if (checkedLocations.includes(locationId)) {
      // Si está seleccionada, la deseleccionamos
      setCheckedLocations(checkedLocations.filter((id) => id !== locationId));
    } else {
      // Si no está seleccionada, la seleccionamos
      setCheckedLocations([...checkedLocations, locationId]);
    }
    dispatch(fiterCompaniesByLocation(checkedLocations));
  }

  return (
    <div>
      {data?.map((item) => (
        <div>
          <input
            type="checkbox"
            name="cuenca"
            id={item.id}
            className="mr-2 cursor-pointer peer"
            onChange={handleChecked}
          />
          <label className="peer-checked:text-secondary-500 peer-checked:font-semibold">
            {item.name}
          </label>
        </div>
      ))}
    </div>
  );
}

export default LocationFilter