/* Mapeo con filtro
const data = [
  { id: 1, name: "Item 1", active: true },
  { id: 2, name: "Item 2", active: false },
  { id: 3, name: "Item 3", active: true },
  { id: 4, name: "Item 4", active: false }
];

// Filtrar los elementos activos y luego mapearlos
const filteredAndMappedData = data
  .filter(item => item.active) // Filtrar solo los elementos activos
  .map(item => item.name); // Mapear los elementos filtrados

console.log(filteredAndMappedData);
// Output: ["Item 1", "Item 3"]

*/
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
import { getCompanyId, getUserId } from "@/app/Func/sessionStorage";
import Popup from "./components/popup";

const socketIo = io("http://localhost:3001");

const Page = ({ params: { id } }) => {
  const [company, setCompany] = useState(null);
  const [allMessages, setAllMessages] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [buttonChat, setButtonChat] = useState([]);

  const companyId = getCompanyId();
  const userId = getUserId();

  const receiver = allUsers.find((user) => user.company.id === id);
  const sender = allUsers.find((user) => user.company.id === companyId);
  if (!companyId) {
    window.alert("Debe estar asociado a una empresa para utilizar el chat");
    return;
  }

  const senderId = companyId;
  const receiverId = id;

  useEffect(() => {
    // Emitir evento de autenticación para guardar el socket
    socketIo.emit("authenticate", { senderId });

    // Escuchar eventos para saber si se conecto
    socketIo.on("connect", () => {
      console.log("Connected to server");
    });
    /*
    return () => {
      // Desconectar socket cuando la página se desmonte
      socketIo.disconnect();
    };
  */
  }, []);

  useEffect(() => {
    axiosGetAllUsers(setAllUsers);
    axiosGetAllMessages(setAllMessages);
    if (id) {
      axiosGetDetailCompany(id, setCompany);
    }
  }, [id]);

  useEffect(() => {
    if (allUsers.length > 0) {
      let usuariosUnicos = new Set();
      allUsers.forEach((item) => {
        usuariosUnicos.add(item.company.name);
      });
      let usuariosUnicosArray = Array.from(usuariosUnicos);
      setButtonChat(usuariosUnicosArray);
    }
  }, [allUsers]);

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
      }
    });

    return () => {
      socketIo.off("message");
    };
  }, [sender, receiver]);

  const handleSendMessage = useCallback(
    (e) => {
      e.preventDefault();
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
        _sender: senderId,
        _receiver: receiverId,
      });
      axiosPostMessage({
        text: messageText,
        senderId: sender?.id,
        receiverId: receiver?.id,
      });

      setMessageText("");
    },
    [messageText, sender, receiver]
  );

  if (!company) return "loading...";
  /*if (!sender) {
    window.alert("Para ingresar al chat, debe estar asociado a una compañía");
    return;
  }
*/
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
            <div className="col-span-1">
              {buttonChat.map((item) => {
                return (
                  <button className="mb-2 text-sm text-white bg-black">
                    {item}
                  </button>
                );
              })}
            </div>
            <div className="col-span-1">Logo sender</div>
            <div className="col-span-9 max-h-[300px] overflow-y-auto">
              {allMessages.map((message, index) => {
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
            <div className="col-span-1">Logo receiver</div>
          </div>
          <form className="flex mt-4" onSubmit={handleSendMessage}>
            <input
              type="text"
              className="flex-1 px-4 py-2 mr-2 border rounded focus:outline-none"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
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
