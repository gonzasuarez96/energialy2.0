"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { urlProduction } from "@/app/data/dataGeneric";

import CollapsedBar from "./components/collapsedBar";
import { setAllCompanies } from "@/app/redux/features/companieSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import axios from "axios";
import { axiosGetAllMessages, axiosGetAllUsers, axiosGetDetailCompany, axiosPostMessage } from "@/app/Func/axios";
const socketIo = io("http://localhost:3001");

function getCompanyId() {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('companyId');
  }
}

function page(props) {
  const { id } = props.params;

  const [company, setCompany] = useState({});
  const [allMessages, setAllMessages] = useState([]);
  const [showChatBox, setShowChatBox] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  // * MENSAJES RECIBIDOS
  const remitente = allUsers.find(function(el) {
    return el.company.id === id;
  });

  // * MENSAJES ENVIADOS
  const companyId = getCompanyId();
  const destinatario = allUsers.find(function(el) {
    return el.company.id === companyId;
  });
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    if (!socketIo) return;

    socketIo.on("message", (message) => {
      // console.log("message", message)  
      if (remitente && destinatario) {
        const newMessage = {
          text: message,
          // remitente: remitente,
          // destinatario: destinatario,
          remitente: destinatario,
          destinatario: remitente,
        }
        // console.log("newMessage", newMessage)
        setAllMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    return () => {
      socketIo.off("message");
    };
  }, [socketIo, messageText]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!socketIo || !messageText.trim()) {
      return;
    }
    socketIo.emit("sendMessage", messageText);
    setMessageText("");
    axiosPostMessage({
      text: messageText,
      // remitenteId: remitente?.id,
      // destinatarioId: destinatario?.id,
      remitenteId: destinatario?.id,
      destinatarioId: remitente?.id,
    });
  };

  useEffect(() => {
    axiosGetAllUsers(setAllUsers)
    axiosGetAllMessages(setAllMessages)
    if (id) {
      axiosGetDetailCompany(id, setCompany)
    }
  }, []);

  return (
    <>
      {!company ? (
        "loading..."
      ) : (
        <div className="md:max-w-[70%] m-auto">
          <div className="flex justify-center mt-10">
            <div className="w-full h-1/2 object-cover overflow-hidden -z-10">
              <Image
                className="max-h-[60%]"
                src={company.bannerPicture}
                alt="compay banner picture"
                fill={true}
              />
            </div>
          </div>

          <div className="mt-20">
            <CollapsedBar
              title={"Compañía"}
              company={company}
              intState={false}
            />
            <CollapsedBar
              title={"Licitaciones"}
              company={company}
              intState={true}
            />
          </div>
          <h1>HISTORIAL DE CHAT</h1>
          <div>
            {allMessages.map(function(el, index) {
                const companyOne = !el.remitente.Company ? el.remitente.company.name : el.remitente.Company.name;
                const companyTwo = !el.destinatario.Company ? el.destinatario.company.name : el.destinatario.Company.name;

                return (
                  <div key={el.id || index}>
                    {/* MENSAJE EMPRESA 1 */}
                    <div
                      className={
                        `mb-2 ${companyOne ? 'flex justify-end' : 'flex justify-start'}`
                      }
                    >
                      <div className="bg-gray-200 p-3 rounded-lg">
                        <strong>Empresa - 1: </strong>
                        <p className="font-semibold">{companyOne}</p>
                        <p className="text-xs text-gray-500">{el.createdAt}</p>
                        <p>{el.text}</p>
                      </div>
                    </div>
                    {/* MENSAJE EMPRESA 2 */}
                    <div
                      className={
                        `mb-2 ${companyTwo ? 'flex justify-start' : 'flex justify-end'}`
                      }
                    >
                      <div className="bg-gray-200 p-3 rounded-lg">
                        <strong>Empresa - 2: </strong>
                        <p className="font-semibold">{companyTwo}</p>
                        <p className="text-xs text-gray-500">{el.createdAt}</p>
                        <p>{el.text}</p>
                      </div>
                    </div>
                  </div>
                );
            })}
          </div>
          <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setShowChatBox(!showChatBox)}
          >
              Open Chat
          </button>
          {showChatBox && (
              <div className="bg-gray-200 p-4 rounded mt-4">
              <div className="bg-gray-200 p-4 rounded">
                  <form className="flex">
                      <input
                          type="text"
                          className="flex-1 mr-2 border rounded px-4 py-2 focus:outline-none"
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          placeholder="Type your message..."
                      />
                      <button
                          type="sumit"
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                          onClick={sendMessage}
                      >
                          Send
                      </button>
                  </form>
              </div>
              </div>
          )}
        </div>
      )}
    </>
  );
}

export default page;
