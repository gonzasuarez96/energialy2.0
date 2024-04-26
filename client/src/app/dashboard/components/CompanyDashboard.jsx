"use client";
import { useState, useEffect } from "react";
import Buttons from "./Buttons";
import DashboardTextCard from "@/app/components/DashboardTextCard";
import DashboardKpiCard from "@/app/components/DashboardKpiCard";
import DashboardTableData from "@/app/components/DashboardTableData";
import { useGetProposalsQuery } from "@/app/redux/services/ProposalApi";
import { useGetTendersQuery } from "@/app/redux/services/tendersApi";
//import getLocalStorage from "../Func/localStorage";
import io from "socket.io-client";
import {
  axiosGetAllMessages,
  axiosGetAllUsers,
  axiosPostMessage,
} from "@/app/Func/axios";
const socketIo = io("http://localhost:3001");

function getCompanyId() {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("companyId");
  }
}

function CompanyDashboard({ user }) {
  const [userProposals, setUserProposals] = useState([]);
  const [proposalsToUser, setProposalsToUser] = useState([]);
  const [userTenders, setUserTenders] = useState([]);

  const { data: proposals, isLoading: loadingProposals } = useGetProposalsQuery();
  const { data: tenders, isLoading: loadingTenders } = useGetTendersQuery();

  const [allUsers, setAllUsers] = useState([]);

  // * MENSAJES ENVIADOS
  const companyId = getCompanyId();
  const remitente = allUsers.find(function (el) {
    return el.company.id === companyId;
  });

  // * MENSAJES RECIBIDOS
  const [allMessages, setAllMessages] = useState([]);
  const destinatario = allUsers.find(function (el) {
    const { mensajesRecibidos } = el;
    const filterMessage = mensajesRecibidos.find(function (mensajeRecibido) {
      const findMatchMessage = allMessages.find(function (eachMessage) {
        if (eachMessage.id === mensajeRecibido.id) {
          return el;
        }
      });
      return findMatchMessage;
    });
    return filterMessage;
  });
  
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    if (!socketIo) return;

    socketIo.on("message", (message) => {
      // console.log("message", message)
      if (remitente && destinatario) {
        const newMessage = {
          text: message,
          remitente: remitente,
          destinatario: destinatario,
        };
        // console.log("newMessage", newMessage)
        setAllMessages((prevMessages) => [...prevMessages, newMessage]);
        scrollToBottom();
      }
    });

    return () => {
      socketIo.off("message");
    };
  }, [socketIo, messageText]);

  const scrollToBottom = () => {
    const element = document.getElementById("chatMessages");
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!socketIo || !messageText.trim() || !destinatario) {
      setMessageText("");
      return;
    }
    socketIo.emit("sendMessage", messageText);
    setMessageText("");
    axiosPostMessage({
      text: messageText,
      remitenteId: remitente?.id,
      destinatarioId: destinatario?.id,
    });
  };
  
  useEffect(() => {
    axiosGetAllUsers(setAllUsers);
    axiosGetAllMessages(setAllMessages);
    if (user.company) {
      setUserProposals(proposals?.filter((proposal) => proposal.company.id === user.company.id));
      setProposalsToUser(proposals?.filter((proposal) => proposal.tender.Company.id === user.company.id));
      setUserTenders(tenders?.filter((tender) => tender.company.id === user.company.id));
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  return (
    <div>
      <div className="flex items-center p-2 font-extralight font-jose text-6xl text-gray-400">
        Hola, {user.firstName}
        <div className="flex-grow">
          <Buttons />
        </div>
      </div>
      <div className="w-full h-screen rounded-md flex flex-col gap-3 p-2">
        <div className="w-full bg-white rounded-md flex gap-3 p-2">
          <div className="w-1/2">
            <DashboardTextCard title={"Ingresos"} content={"-"} />
            <DashboardKpiCard title={"Propuestas Enviadas En Otras Licitaciones"} content={userProposals} />
            <DashboardKpiCard title={"Propuestas Recibidas En Mis Licitaciones"} content={proposalsToUser} />
          </div>
          <div className="w-1/2">
            <div className="flex justify-between gap-2">
              <DashboardTextCard title={"Ingresos Pendientes"} content={"-"} />
              <DashboardTextCard title={"Inversiones"} content={"-"} />
            </div>
            <div className="h-full flex flex-col">
              <div className="max-h-80 overflow-y-auto" id="chatMessages">
                <h1 className="text-xl font-bold mb-4">Historial de Chat</h1>
                {allMessages.map((el, index) => {
                  const isSenderCompany1 = !el.remitente.Company ? el.remitente.company.name : el.remitente.Company.name;
                  const isSenderCompany2 = !el.destinatario.Company ? el.destinatario.company.name : el.destinatario.Company.name;
                  const sendMessage = allUsers.filter(function(user) {
                    return user.id === el.destinatario.id;
                  }).flat(1).filter(function(msg) {
                    if (msg.mensajesEnviados.length >= 1) {
                      return user.mensajesEnviados.filter(function(text) {
                        return text.id === el.id;
                      });
                    }
                  })
                  // console.log("isSenderCompany1", isSenderCompany1)

                  return (
                    <div key={el.id || index}>

                      <div className={`mb-2 ${isSenderCompany1 ? "flex justify-start" : "flex justify-end"}`}>
                        <div className="bg-gray-200 p-3 rounded-lg">
                          <strong>Empresa - 1: </strong><p className="font-semibold">{isSenderCompany1}</p>
                          <p className="text-xs text-gray-500">{el.createdAt}</p>
                          <p>{el.text}</p>
                        </div>
                      </div>

                      <div className={`mb-2 ${isSenderCompany2 ? "flex justify-end" : "flex justify-start"}`}>
                        <div className="bg-gray-200 p-3 rounded-lg">
                          <strong>Empresa - 2: </strong><p className="font-semibold">{isSenderCompany2}</p>
                          <p className="text-xs text-gray-500">{el.createdAt}</p>
                          {/* <p>{el.text}</p> */}
                          {
                            sendMessage?.map(function(el, idx) {
                              // console.log("el", el)
                              return (
                                <div key={el.id || idx}>
                                  <p>{el.text}</p>
                                </div>
                              );
                            })
                          }
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
              <form className="flex mt-4">
                <input
                  type="text"
                  className="flex-1 mr-2 border rounded px-4 py-2 focus:outline-none"
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                />
                <button
                  type="submit"
                  onClick={sendMessage}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Enviar
                </button>
              </form>
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

export default CompanyDashboard;
