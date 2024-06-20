"use client";
import { useState, useEffect } from "react";
import Buttons from "./Buttons";
import DashboardTextCard from "@/app/components/DashboardTextCard";
import DashboardKpiCard from "@/app/components/DashboardKpiCard";
import DashboardTableData from "@/app/components/DashboardTableData";
import { useGetProposalsQuery } from "@/app/redux/services/ProposalApi";
import { useGetTendersQuery } from "@/app/redux/services/tendersApi";
import { getCompanyId } from "@/app/Func/sessionStorage";
//import ChatComponent from "./CompanyDashboardChat";
import Chat from "@/app/components/Chat";

function CompanyDashboard({ user }) {
  const [userProposals, setUserProposals] = useState([]);
  const [proposalsToUser, setProposalsToUser] = useState([]);
  const [userTenders, setUserTenders] = useState([]);

  const { data: proposals, isLoading: loadingProposals } = useGetProposalsQuery();
  const { data: tenders, isLoading: loadingTenders } = useGetTendersQuery();

  const companyId = getCompanyId();

  useEffect(() => {
    if (user.company) {
      setUserProposals(proposals?.filter((proposal) => proposal.company.id === user.company.id));
      setProposalsToUser(proposals?.filter((proposal) => proposal.tender.Company.id === user.company.id));
      setUserTenders(tenders?.filter((tender) => tender.company.id === user.company.id));
    }
  }, [proposals, tenders, user.company]);

  return (
    <div>
      <div className="flex">
        <h1 className="flex items-center p-2 text-xl text-gray-400 font-extralight font-jose">Hola, {user.firstName}</h1>
        <div className="flex-grow">
          <Buttons />
        </div>
      </div>
      
      <div className="flex flex-col w-full h-screen gap-3 p-2 rounded-md">
        <div className="flex w-full gap-3 p-2 bg-white rounded-md">
          {/* Left */}
          <div className="w-1/2">
            <DashboardTextCard title={'Ingresos'} content={'-'} />
            <DashboardKpiCard title={'Propuestas Enviadas En Otras Licitaciones'} content={userProposals} />
            <DashboardKpiCard title={'Propuestas Recibidas En Mis Licitaciones'} content={proposalsToUser} />
          </div>
          {/* Right */}
          <div className="w-1/2">
            <div className="flex justify-between gap-2">
              <DashboardTextCard title={"Ingresos Pendientes"} content={"-"} />
              <DashboardTextCard title={"Inversiones"} content={"-"} />
            </div>
            {/*<ChatComponent user={user} />*/}
            <Chat />
          </div>
        </div>
        <div className="flex w-full gap-3 p-2 bg-white rounded-md">
          {!loadingTenders ? <DashboardTableData title={'MIS LICITACIONES'} data={userTenders} /> : <p>Cargando..</p>}
        </div>
      </div>
    </div>
  )
}

export default CompanyDashboard;
