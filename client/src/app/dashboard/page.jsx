'use client'
import { useState, useEffect  } from "react";
import getLocalStorage from "../Func/localStorage";
import CompanyDashboard from "./components/CompanyDashboard";

function DasboardPage() {
  
  const [user, setUser] = useState(null);
  //console.log(user)
  
  useEffect(() => {
     const user = getLocalStorage();
     setUser(user)
  },[])

  return (
    <div className="w-full h-100 bg-[#f8f8fb] ml-4">
      {!user ? (
        <p>Cargando..</p>
      ) : user.role !== 'bank'? (
        <CompanyDashboard user={user}/>
      ): (<div>Dashboard de Banco</div>)}
    </div>
  );
}

// TODO separar el Detalle de la tender a una vista aparte.

export default DasboardPage;
