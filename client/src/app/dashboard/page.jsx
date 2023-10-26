'use client'
import React from "react";
import Buttons from "./components/Buttons";
import DashboardTextCard from '@/app/components/DashboardTextCard'
import DashboardKpiCard from "@/app/components/DashboardKpiCard";
import DashboardTableData from "@/app/components/DashboardTableData";
import { useGetProposalsQuery } from "../redux/services/ProposalApi";
import { useGetTendersQuery } from "../redux/services/tendersApi";
import getLocalStorage from "../Func/localStorage";

function DasboardPage() {
  
  const user = getLocalStorage()
  console.log('userPage:',user)

  const {data:proposals, isLoading:loadingProposals} = useGetProposalsQuery()
  const {data: tenders, isLoading:loadingTenders} = useGetTendersQuery()

  console.log('proposals:',proposals)
  console.log('tenders:',tenders)
  const userProposals = proposals?.filter(proposal=> proposal.company.id === user.company.id);
  console.log('userProposals:',userProposals)
  const proposalsToUser = proposals?.filter(proposal=> proposal.tender.Company.id === user.company.id);
  console.log("proposalsToUser:", proposalsToUser);
  const userTenders = tenders?.filter(tender=> tender.company.id === user.company.id);

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
              title={"Propuestas Enviadas En Otras Licitaciones"}
              content={userProposals}
            />
            <DashboardKpiCard
              title={"Propuestas recibidas"}
              content={proposalsToUser}
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
          {!loadingTenders ? (
            <DashboardTableData title={"MIS LICITACIONES"} data={userTenders} />
          ) : (
            <p>Cargando..</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DasboardPage;
