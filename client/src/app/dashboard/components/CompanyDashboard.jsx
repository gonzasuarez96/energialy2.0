
"use client";
import { useState, useEffect, use } from "react";
import Buttons from "./Buttons";
import DashboardTextCard from "@/app/components/DashboardTextCard";
import DashboardKpiCard from "@/app/components/DashboardKpiCard";
import DashboardTableData from "@/app/components/DashboardTableData";
import { useGetProposalsQuery } from "@/app/redux/services/ProposalApi";
import { useGetTendersQuery } from "@/app/redux/services/tendersApi";
//import getLocalStorage from "../Func/localStorage";
import { getCompanyId, getUserId } from "@/app/Func/sessionStorage";

function CompanyDashboard({ user }) {
  const [userProposals, setUserProposals] = useState([]);
  const [proposalsToUser, setProposalsToUser] = useState([]);
  const [userTenders, setUserTenders] = useState([]);

  const { data: proposals, isLoading: loadingProposals } = useGetProposalsQuery();
  const { data: tenders, isLoading: loadingTenders } = useGetTendersQuery();

  const [allUsers, setAllUsers] = useState([]);

  // * QUIEN ENVIA EL MENSAJE
  
  const companyId = getCompanyId();
  const userId = getUserId();
  const sender = allUsers.find(function (el) {
    if (el.company){
      return el.company === companyId;
    }
  });

  // * QUIEN RECIBE EL MENSAJE
  const [allMessages, setAllMessages] = useState([]);
  const receiver = allUsers.find(function (el) {
    const { receivedMessages } = el;
    const filterMessage = receivedMessages.find(function (receivedMessage) {
      const findMatchMessage = allMessages.find(function (eachMessage) {
        if (eachMessage.id === receivedMessage.id) {
          return el;
        }
      });
      return findMatchMessage;
    });
    return filterMessage;
  });

  //* LISTA DE CONTACTOS
  const contactos = allUsers.map(user =>{
    return user.company
  })

  const [messageText, setMessageText] = useState("");

  
  const sendMessage = (e) => {
    e.preventDefault();
    if (!socketIo || !messageText.trim() || !receiver) {
      setMessageText("");
      return;
    }
    socketIo.emit("sendMessage", messageText);
    setMessageText("");
    axiosPostMessage({
      text: messageText,
      senderId: sender?.id,
      receiverId: receiver?.id,
    });
  };

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
        <h1 className="flex items-center p-2 font-extralight font-jose text-xl text-gray-400">Hola, {user.firstName}</h1>
        <div className="flex-grow">
          <Buttons />
        </div>
      </div>
      

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
              <DashboardTextCard title={"Ingresos Pendientes"} content={"-"} />
              <DashboardTextCard title={"Inversiones"} content={"-"} />
            </div>
            
            <section className="">

                <div className="text-center border-solid rounded-sm border-s-sky-100">
                  <h2 className="text-base">Mensajes ///</h2>
                </div>
                
             {!companyId ? <h3>Necesitas una Empresa para acceder al chat.</h3> : 
             <div className="flex flex-col h-full">
              
              <div>
                <h2>Lista de Contactos</h2>

                <ul className="bg-while-800">
                {contactos.map(user =>{
                  return <li className="hover:border-4 border-s-red-950">
                          {user?.name}
                          </li>
                  })} 
                  </ul>
              </div>

              <div className="overflow-y-auto max-h-80" id="chatMessages">

                <h1 className="mb-4 text-xl font-bold">Historial de Chat</h1>
                {allMessages.map((message, index) => {
                  return (
                    <div
                      key={message.id || index}
                      className={`${message.sender.id === userId ? "text-right" : "text-left"} mb-2`}
                    >
                      {message.sender.id === userId ? (
                        <div className="p-3 bg-gray-200 rounded-lg">
                          <p>
                            <strong>Tú: </strong>
                            {!message.sender.fullName
                              ? `${message.sender.firstName} ${message.sender.lastName}`
                              : message.sender.fullName}
                          </p>
                          <p>
                            <strong>Mensaje: </strong>
                            {message.text}
                          </p>
                          <p>
                            <strong>Fecha: </strong>
                            {message.createdAt}
                          </p>
                        </div>
                      ) : (
                        <div className="p-3 bg-purple-200 rounded-lg">
                          <p>
                            <strong>Usuario: </strong>
                            {!message.sender.fullName
                              ? `${message.sender.firstName} ${message.sender.lastName}`
                              : message.sender.fullName}
                          </p>
                          <p>
                            <strong>Mensaje: </strong>
                            {message.text}
                          </p>
                          <p>
                            <strong>Fecha: </strong>
                            {message.createdAt}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <form className="flex mt-4">
                
                <input
                  type="text"
                  className="flex-1 px-4 py-2 mr-2 border rounded focus:outline-none"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                />
                
                <button
                  type="submit"
                  onClick={sendMessage}
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Enviar
                </button>
                
              </form>
             </div> }

            </section>  {/* Contenedor de chat */}
            
          </div>
        </div>
        <div className="w-full bg-white rounded-md flex gap-3 p-2">
          {!loadingTenders ? <DashboardTableData title={'MIS LICITACIONES'} data={userTenders} /> : <p>Cargando..</p>}
        </div>
      </div>
    </div>
  )
}

export default CompanyDashboard;
