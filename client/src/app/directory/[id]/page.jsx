"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import CollapsedBar from "./components/collapsedBar";
import io from "socket.io-client";
import {
  axiosGetAllMessages,
  axiosGetAllUsers,
  axiosGetDetailCompany,
  axiosPostMessage,
} from "@/app/Func/axios";
import { getCompanyId, getUserId } from "@/app/Func/sessionStorage";
const socketIo = io("http://localhost:3001");

function page(props) {
  const { id } = props.params;

  const [company, setCompany] = useState({});
  const [allMessages, setAllMessages] = useState([]);
  const [showChatBox, setShowChatBox] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  // * QUIEN RECIBE EL MENSAJE
  const receiver = allUsers.find(function (el) {
    return el.company.id === id;
  });

  // * QUIEN ENVIA EL MENSAJE
  const companyId = getCompanyId();
  const userId = getUserId();
  // * SE VERIFICA QUE TENGA UNA COMPAÑIA CREADA
  const sender = allUsers.find(function (el) {
    return el.company.id === companyId;
  });
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    if (!socketIo) return;

    socketIo.on("message", (message) => {
      // * SE CREA UN OBJETO RAMDON TEMPORAL PARA LA VISUALIZACION EN TIEMPO REAL
      if (sender && receiver) {
        const newMessage = {
          text: message,
          sender: sender,
          receiver: receiver,
        };
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
      senderId: sender?.id,
      receiverId: receiver?.id,
    });
  };

  useEffect(() => {
    axiosGetAllUsers(setAllUsers);
    axiosGetAllMessages(setAllMessages);
    if (id) {
      axiosGetDetailCompany(id, setCompany);
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
            {allMessages.map(function (message, index) {
              return (
                <div
                  key={message.id || index}
                  className={`${
                    message.sender.id === userId ? "text-right" : "text-left"
                  } mb-2`}
                >
                  {message.sender.id === userId ? (
                    <div className="bg-gray-200 p-3 rounded-lg">
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
                    <div className="bg-purple-200 p-3 rounded-lg">
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
