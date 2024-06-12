"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Popup from "../directory/[id]/components/popup";
import Messages from "./Messages";

import {
  axiosGetAllMessages,
  axiosGetAllUsers,
  axiosPostMessage,
} from "@/app/Func/axios";

import {
  getCompanyId,
  getCompanyName,
  getUserId,
} from "@/app/Func/sessionStorage";

import io from "socket.io-client";
const socketIo = io("http://localhost:3001");

const Chat = ({ id, company }) => {
  //id: Compañía seleccionada en el perfil
  const [allUsers, setAllUsers] = useState([]); //Carga todos los usuarios
  const [allMessages, setAllMessages] = useState([]); //Mantiene todos los mensajes
  const [messageText, setMessageText] = useState(""); //Texto del mensaje a enviar
  const [showPopup, setShowPopup] = useState(false); //Muestra/esconde caja chat

  //FILTRADO EN CHAT
  const [buttonChat, setButtonChat] = useState([]); //Botones para seleccionar empresas en el chat
  const [filteredMessages, setFilteredMessages] = useState([]); //Mensajes filtrados en chat
  const [selectedCompany, setSelectedCompany] = useState(null); //Compañía seleccionada para mostrar en chat

  const [receiver, setReceiver] = useState(null); //Quien recibe
  const [sender, setSender] = useState(null); //Quien envia

  //Rescato del sessionStorage - son los datos del sender
  const companyId = getCompanyId(); //Id de compañía logueada -
  const userId = getUserId(); //Id de usuario logueado
  const myName = getCompanyName(); //Nombre de la compañía logueada->sirve para filtro de chat
  let usuariosUnicos = new Set();

  //Envio de usuarios a server para su asignacion
  //Se envia el id de la compañía
  useEffect(() => {
    // Emitir evento de autenticación para guardar el socket
    socketIo.emit("authenticate", { companyId });

    // Escuchar eventos para saber si se conecto
    socketIo.on("connect", () => {
      console.log("Connected to server");
    });
  }, []);

  //Carga usuarios y mensajes al comienzo, y detalles del primer destinatario
  useEffect(() => {
    axiosGetAllUsers(setAllUsers);
    axiosGetAllMessages(setAllMessages);
    !company && setShowPopup(true);
  }, []);

  //Carga sender y receiver
  useEffect(() => {
    if (allUsers.length > 0 && id) {
      const foundReceiver = allUsers.find((user) => user.company.id === id);
      const foundSender = allUsers.find(
        (user) => user.company.id === companyId
      );
      setReceiver(foundReceiver);
      setSender(foundSender);
      //Seteo inicial de compañía seleccionada para filtrar en chat
      if (foundReceiver) {
        setSelectedCompany(foundReceiver.company.name);
      }
    } else if (allUsers.length > 0 && !id) {
      const foundSender = allUsers.find(
        (user) => user.company.id === companyId
      );
      setSender(foundSender);
    }
  }, [allUsers, id, companyId]);

  //Filtra chat por compañía seleccionada
  useEffect(() => {
    if (selectedCompany) {
      if (selectedCompany.slice(-2) === "🔔") {
        const oldSelectedCompany = selectedCompany;
        setSelectedCompany(selectedCompany.slice(0, -2));

        const indice = buttonChat.indexOf(oldSelectedCompany);
        const newButtonChat = buttonChat;
        newButtonChat[indice] = oldSelectedCompany.slice(0, -2);
        setButtonChat(newButtonChat);
      }

      const filtered = allMessages.filter((message) => {
        const senderCompany = message.sender.company
          ? message.sender.company.name
          : message.sender.Company.name;

        const receiverCompany = message.receiver.company
          ? message.receiver.company.name
          : message.receiver.Company.name;

        return (
          (senderCompany === selectedCompany && receiverCompany === myName) ||
          (senderCompany === myName && receiverCompany === selectedCompany)
        );
      });

      const newReceiver = allUsers.find(
        (user) => user.company.name === selectedCompany
      );

      setFilteredMessages(filtered);
      setReceiver(newReceiver);
    }
  }, [allMessages, selectedCompany, myName, allUsers]);

  //Agrega las compañías a los botones de seleccion del chat
  //excepto al usuario
  useEffect(() => {
    if (allUsers.length > 0) {
      allUsers.forEach((item) => {
        if (item.company.name !== myName) {
          usuariosUnicos.add(item.company.name);
        }
      });
      const usuariosUnicosArray = Array.from(usuariosUnicos);
      setButtonChat(usuariosUnicosArray);
    }
  }, [allUsers, myName]);

  //Recibe los mensajes
  useEffect(() => {
    if (!socketIo) return;
    const messageListener = (message) => {
      const { _message, _sender, _receiver } = message;
      const foundReceiver = allUsers.find(
        (user) => user.company.id === _sender
      );

      //OJO CUANDO RECIBO EL MENSAJE PARA MI->YO SOY EL RECEIVER
      const foundSender = allUsers.find(
        (user) => user.company.id === _receiver
      );

      if (foundSender && foundReceiver) {
        const newMessage = {
          text: _message,
          sender: foundReceiver,
          receiver: foundSender,
          createdAt: new Date().toISOString(),
        };
        setAllMessages((prevMessages) => [...prevMessages, newMessage]);
      }

      const foundCompanyName = foundReceiver.company.name;
      if (selectedCompany !== foundCompanyName) {
        const button = buttonChat.find((button) => button === foundCompanyName);
        const button2 = button.concat("🔔");
        const newButtonChat = buttonChat.filter(
          (element) => element !== foundCompanyName
        );
        newButtonChat.unshift(button2);
        setButtonChat(newButtonChat);
      }
    };

    socketIo.on("message", messageListener);

    //Aqui agregar icono de mensaje nuevo
    //

    return () => {
      socketIo.off("message", messageListener);
    };
  }, [allMessages, allUsers, sender, receiver]);

  //Envia los mensajes
  const handleSendMessage = useCallback(
    (event) => {
      event.preventDefault();

      if (!socketIo || !messageText.trim()) return;
      const newMessage = {
        text: messageText,
        sender,
        receiver,
        createdAt: new Date().toISOString(),
      };

      setAllMessages((prevMessages) => [...prevMessages, newMessage]);

      socketIo.emit("sendMessage", {
        _message: messageText,
        _sender: companyId,
        _receiver: receiver.company.id,
      });

      axiosPostMessage({
        text: messageText,
        senderId: sender.id,
        receiverId: receiver.id,
      });

      setMessageText("");
    },
    [messageText, sender, receiver, companyId, id]
  );

  //Establece compañía seleccionada en boton del chat
  const handleSelectCompany = (companyName) => {
    setSelectedCompany(companyName);
  };

  return (
    <>
      {company && (
        <button
          className="flex items-center justify-center px-4 py-2 text-white bg-green-500 rounded-full hover:bg-green-600"
          onClick={() => setShowPopup(true)}
        >
          <div className="flex items-center justify-center w-16 h-16 mr-2 overflow-hidden rounded-full">
            <img
              className="object-cover w-full h-full"
              src={company.profilePicture}
              alt="Profile"
            />
          </div>
          <span className="text-center">Inicia un Chat con {company.name}</span>
        </button>
      )}
      {company ? (
        <Popup show={showPopup} onClose={() => setShowPopup(false)}>
          <h2>Chat</h2>
          <div className="max-h-[400px] overflow-y-auto">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-2">
                {buttonChat.map((item) => (
                  <button
                    key={item}
                    className={`w-full px-2 py-1 mb-2 text-sm text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      selectedCompany === item
                        ? "bg-blue-500"
                        : "bg-gray-600 hover:bg-gray-800"
                    }`}
                    onClick={() => handleSelectCompany(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <Messages filteredMessages={filteredMessages} userId={userId} />
            </div>
            <form className="flex mt-4" onSubmit={handleSendMessage}>
              <input
                type="text"
                className="flex-1 px-4 py-2 mr-2 border rounded focus:outline-none"
                value={messageText}
                onChange={(event) => setMessageText(event.target.value)}
                placeholder="Type your message..."
              />
              <button
                type="submit"
                className="px-4 py-2 text-black bg-blue-400 rounded hover:bg-blue-600"
              >
                Send
              </button>
            </form>
          </div>
        </Popup>
      ) : (
        <div>
          <h2 className="font-bold text-center text-md">Chat</h2>
          <div className="max-h-[400px]">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-2 overflow-y-auto text-sm">
                {buttonChat.map((item) => (
                  <button
                    key={item}
                    className={`w-full px-2 py-1 mb-2 text-sm text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      selectedCompany === item
                        ? "bg-blue-500"
                        : "bg-gray-600 hover:bg-gray-800"
                    }`}
                    onClick={() => handleSelectCompany(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <Messages filteredMessages={filteredMessages} userId={userId} />
            </div>

            <form className="flex mt-4" onSubmit={handleSendMessage}>
              <input
                type="text"
                className="flex-1 px-4 py-2 mr-2 border rounded focus:outline-none"
                value={messageText}
                onChange={(event) => setMessageText(event.target.value)}
                placeholder="Type your message..."
              />
              <button
                type="submit"
                className="px-4 py-2 text-black bg-blue-400 rounded hover:bg-blue-600"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default Chat;
