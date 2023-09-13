"use client";
import React, { useState } from "react";

export default function FormCompany({ selectedOption }) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [locations, setLocations] = useState("");
    const [subcategories, setSubCategories] = useState("");
    const [foundationYear, setfoundationYear] = useState("");
    const [annualRevenue, setAnnualRevenue] = useState("");
    const [employeeCount, setEmployeeCount] = useState("");
    const [cuit, setCuit] = useState("");

    return(
        <div>
        {selectedOption === 0 && (
          <form className="mb-2 pl-4 pr-4 pt-4">
            {/* Renderizar campos de Nombre y Descripción aquí */}
          </form>
        )}
        {selectedOption === 1 && (
          <form className="mb-2 pl-4 pr-4 pt-4">
            {/* Renderizar campos de Detalles aquí */}
          </form>
        )}
        {/* Agrega más condiciones según sea necesario para las otras secciones */}
      </div>
    );
}