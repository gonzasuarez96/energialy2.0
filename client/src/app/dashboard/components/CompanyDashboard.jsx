'use client';
import { useState, useEffect } from 'react';
import Buttons from './Buttons';
import DashboardTextCard from '@/app/components/DashboardTextCard';
import DashboardKpiCard from '@/app/components/DashboardKpiCard';
import DashboardTableData from '@/app/components/DashboardTableData';
import { useGetProposalsQuery } from '@/app/redux/services/ProposalApi';
import { useGetTendersQuery } from '@/app/redux/services/tendersApi';
//import getLocalStorage from "../Func/localStorage";

function CompanyDashboard({ user }) {
  const [userProposals, setUserProposals] = useState([]);
  const [proposalsToUser, setProposalsToUser] = useState([]);
  const [userTenders, setUserTenders] = useState([]);

  const { data: proposals, isLoading: loadingProposals } = useGetProposalsQuery();
  const { data: tenders, isLoading: loadingTenders } = useGetTendersQuery();

  useEffect(() => {
    if (user.company) {
      setUserProposals(proposals?.filter((proposal) => proposal.company.id === user.company.id));
      setProposalsToUser(proposals?.filter((proposal) => proposal.tender.Company.id === user.company.id));
      setUserTenders(tenders?.filter((tender) => tender.company.id === user.company.id));
    }
  }, []);

  return (
    <div>
      <div className="flex">
        <h1 className="flex items-center p-2 font-extralight font-jose text-6xl text-gray-400">Hola, {user.firstName}</h1>
        <div className="flex-grow">
          <Buttons />
        </div>
      </div>
      {/*Contenido del Dashboard*/}
      {/* TODO esta pendiente de realizar la logica para el calculo de las ganancias, los pendientes de ingreso y las inversiones*/}
      <div className="w-full h-screen rounded-md flex flex-col gap-3 p-2">
        <div className="w-full bg-white rounded-md flex gap-3 p-2">
          {/*Left */}
          <div className="w-1/2">
            <DashboardTextCard title={'Ingresos'} content={'-'} />
            <DashboardKpiCard title={'Propuestas Enviadas En Otras Licitaciones'} content={userProposals} />
            <DashboardKpiCard title={'Propuestas Recibidas En Mis Licitaciones'} content={proposalsToUser} />
          </div>
          {/*Rigth */}
          <div className="w-1/2">
            <div className="flex justify-between gap-2">
              <DashboardTextCard title={'Ingresos Pendientes'} content={'-'} />
              <DashboardTextCard title={'Inversiones'} content={'-'} />
            </div>
            <div className="h-full flex justify-center items-center">Espacio para chat</div>
          </div>
        </div>
        <div className="w-full bg-white rounded-md flex gap-3 p-2">
          {!loadingTenders ? <DashboardTableData title={'MIS LICITACIONES'} data={userTenders} /> : <p>Cargando..</p>}
        </div>
      </div>
    </div>
  );
}

export default CompanyDashboard;
