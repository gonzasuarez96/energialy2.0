'use client'
import React from "react";
import { useSelector } from "react-redux";
import Buttons from "./components/Buttons";
import DashboardTextCard from '@/app/components/DashboardTextCard'
import DashboardKpiCard from "@/app/components/DashboardKpiCard";
import DashboardTableData from "@/app/components/DashboardTableData";
import { useGetProposalsQuery } from "../redux/services/ProposalApi";
import { useGetTendersQuery } from "../redux/services/tendersApi";

function DasboardPage() {
  

  const userD = localStorage.getItem("user");
  const user = JSON.parse(userD);
  console.log('userPage:',user)

  return (
    <div className="w-full h-100 bg-[#f8f8fb] ml-4">
      <div className="flex">
        <h1 className="flex items-center p-2">Hola, {user.firstName}</h1>
        <div className="flex-grow">
          <Buttons />
        </div>
      </div>
      {/*Contenido del Dashboard*/}

      <div className="w-full h-screen rounded-md flex flex-col gap-3 p-2">
        <div className="w-full bg-white rounded-md flex gap-3 p-2">
          {/*Left */}
          <div className="w-1/2">
            <DashboardTextCard title={"Ingresos"} content={"U$S 10500"} />
            <DashboardKpiCard
              title={"Propuestas Recibidas En Mi Perfil"}
              content={userProposals}
            />
            <DashboardKpiCard
              title={"Propuestas Enviadas En Otras Licitaciones "}
              content={userProposals}
            />
          </div>
          {/*Rigth */}
          <div className="w-1/2">
            <div className="flex justify-between gap-2">
              <DashboardTextCard
                title={"Ingresos Pendientes"}
                content={"U$S 0"}
              />
              <DashboardTextCard title={"Inversiones"} content={"U$S 25000"} />
            </div>
            <div className="h-full flex justify-center items-center">
              Espacio para chat
            </div>
          </div>
        </div>
        <div className="w-full bg-white rounded-md flex gap-3 p-2">
          <DashboardTableData title={"MIS LICITACIONES"} data={userTenders} />
        </div>
      </div>
    </div>
  );
}

export default DasboardPage;
