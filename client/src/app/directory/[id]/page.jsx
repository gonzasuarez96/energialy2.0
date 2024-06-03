"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import CollapsedBar from "./components/collapsedBar";
import io from "socket.io-client";
import {
  axiosGetAllMessages,
  axiosGetAllUsers,
  axiosGetDetailCompany,
  axiosPostMessage,
} from "@/app/Func/axios";
import {
  getCompanyId,
  getCompanyName,
  getUserId,
} from "@/app/Func/sessionStorage";
import Popup from "./components/popup";

const socketIo = io("http://localhost:3001");

const Page = ({ params: { id } }) => {
  //id: Compañía seleccionada en el perfil
  const [company, setCompany] = useState(null); //Carga todas las compañias
  const [allUsers, setAllUsers] = useState([]); //Carga todos los usuarios
  const [allMessages, setAllMessages] = useState([]); //Mantiene todos los mensajes
  const [messageText, setMessageText] = useState(""); //Texto del mensaje a enviar

  //FILTRADO EN CHAT
  const [showPopup, setShowPopup] = useState(false); //Muestra/esconce caja chat
  const [buttonChat, setButtonChat] = useState([]); //Botones para seleccionar empresas en el chat
  const [filteredMessages, setFilteredMessages] = useState([]); //Mensajes filtrados en chat
  const [selectedCompany, setSelectedCompany] = useState(null); //Compañía seleccionada para mostrar en chat

  const [receiver, setReceiver] = useState(null);
  const [sender, setSender] = useState(null);

  const companyId = getCompanyId(); //Id de compañía logueada -
  const userId = getUserId(); //Id de usuario logueado
  const myName = getCompanyName(); //Nombre de la compañía logueada->sirve para filtro de chat

  //const receiver = allUsers.find((user) => user.company.id === id); //datos completos del que recibe el mensaje
  //const sender = allUsers.find((user) => user.company.id === companyId); //datos completos de compañía logueda

  let usuariosUnicos = new Set();

  useEffect(() => {
    // Emitir evento de autenticación para guardar el socket
    socketIo.emit("authenticate", { companyId });

    // Escuchar eventos para saber si se conecto
    socketIo.on("connect", () => {
      console.log("Connected to server");
    });
  }, []);

  //Carga usurios y mensajes al comienzo, y detalles del primer destinatario
  useEffect(() => {
    axiosGetAllUsers(setAllUsers);
    axiosGetAllMessages(setAllMessages);
    if (id) {
      axiosGetDetailCompany(id, setCompany);
    }
  }, [id]);

  useEffect(() => {
    if (allUsers.length > 0 && id) {
      const foundReceiver = allUsers.find((user) => user.company.id === id);
      const foundSender = allUsers.find(
        (user) => user.company.id === companyId
      );
      setReceiver(foundReceiver);
      setSender(foundSender);
    }
  }, [allUsers, id, companyId]);

  //FILTRA EL CHAT POR COMPAÑIA SELECCIONADA
  useEffect(() => {
    if (selectedCompany) {
      const filtered = allMessages.filter((message) => {
        const senderCompany = message.sender?.Company?.name;
        const receiverCompany = message.receiver?.Company?.name;
        return (
          (senderCompany === selectedCompany && receiverCompany === myName) ||
          (senderCompany === myName && receiverCompany === selectedCompany)
        );
      });
      setFilteredMessages(filtered);
    } else {
      setFilteredMessages(allMessages);
    }
  }, [allMessages, selectedCompany, myName]);

  //AGREGA LAS COMPAÑIAS A LOS BOTONES DE SELECCION DEL CHAT EXEPTO AL USUARIO
  useEffect(() => {
    if (allUsers.length > 0) {
      allUsers.forEach((item) => {
        item.company.name !== myName
          ? usuariosUnicos.add(item.company.name)
          : null;
      });
      const usuariosUnicosArray = Array.from(usuariosUnicos);
      setButtonChat(usuariosUnicosArray);
    }
  }, [allUsers]);

  //RECIBE LOS MENSAJES
  useEffect(() => {
    if (!socketIo) return;

    socketIo.on("message", (message) => {
      const { _message, _sender, _receiver } = message;

      const prueba = allUsers.find((user) => user.company.id === _sender);

      if (sender && receiver) {
        const newMessage = {
          text: _message,
          sender: prueba, //receiver,
          receiver: sender,
          createdAt: new Date().toISOString(),
        };
        setAllMessages((prevMessages) => [...prevMessages, newMessage]);
        usuariosUnicos.add(prueba.company.name);
        setButtonChat(Array.from(usuariosUnicos));
      }
    });

    return () => {
      socketIo.off("message");
    };
  }, [sender, receiver]);

  //ENVIA LOS MENSAJES
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
        _receiver: id,
      });
      axiosPostMessage({
        text: messageText,
        senderId: sender.id,
        receiverId: receiver.id,
      });

      setMessageText("");
    },
    [messageText, sender, receiver]
  );

  if (!company) return "loading...";

  //ESTABLECE COMPAÑIA SELECCIONADA EN BOTON DEL CHAT
  const handleSelectCompany = (companyName) => {
    setSelectedCompany(companyName);
  };

  return (
    <div className="md:max-w-[70%] m-auto">
      <div className="flex justify-center mt-10">
        <div className="relative w-full h-1/2">
          <Image
            className="object-cover max-h-[60%]"
            src={company.bannerPicture}
            alt="Company banner picture"
            layout="fill"
          />
        </div>
      </div>

      <div className="mt-20">
        <CollapsedBar title="Compañía" company={company} intState={false} />
        <CollapsedBar title="Licitaciones" company={company} intState={true} />
      </div>

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

      <Popup show={showPopup} onClose={() => setShowPopup(false)}>
        <h2>Chat</h2>
        <div className="max-h-[400px] overflow-y-auto">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-2">
              {buttonChat.map((item) => {
                return (
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
                );
              })}
            </div>
            {/*<div className="col-span-1">Logo sender</div>*/}
            <div className="col-span-10 max-h-[300px] overflow-y-auto">
              {filteredMessages.map((message, index) => {
                const isSender = message.sender.id === userId;
                return (
                  <div
                    key={message.id || index}
                    className={`mb-2 ${isSender ? "text-right" : "text-left"}`}
                  >
                    <div
                      className={`p-3 rounded-lg ${
                        isSender ? "bg-gray-200" : "bg-purple-200"
                      }`}
                    >
                      <p>
                        <strong>{isSender ? "Tú" : "Usuario"}: </strong>
                        {message.sender.fullName ||
                          `${message.sender.firstName} ${message.sender.lastName}`}
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
                  </div>
                );
              })}
            </div>
            {/*<div className="col-span-1">Logo receiver</div>*/}
          </div>
          <form className="flex mt-4" onSubmit={handleSendMessage}>
            <input
              type="text"
              className="flex-1 px-4 py-2 mr-2 border rounded focus:outline-none"
              value={messageText}
              onChange={(event) => {
                setMessageText(event.target.value);
              }}
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
    </div>
  );
};

export default Page;
