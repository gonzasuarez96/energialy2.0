'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import getLocalStorage from '../../Func/localStorage';
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

function Page(props) {
  const { id } = props.params;
  const [company, setCompany] = useState({});
  const [allMessages, setAllMessages] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar el popup
  const [allUsers, setAllUsers] = useState([]);
  const [messageText, setMessageText] = useState("");

  // * QUIEN RECIBE EL MENSAJE
   const receiver = allUsers.find(function (el) {
     if(el.company){
      return el.company.id === id;
    }
   });

  // * QUIEN ENVIA EL MENSAJE
  const companyId = getCompanyId();
  const userId = getUserId();

  // * SE VERIFICA QUE TENGA UNA COMPAÑIA CREADA
  const sender = allUsers.find(function (el) {
    if (el.company) {
      return el.company.id === companyId;
    }
  });

  useEffect(() => {
    if (!socketIo) return;
    // fetch(`${urlProduction}/companies/${id}`)
    //   .then((response) => response.json())
    //   .then((data) => setCompany(data))
    //   .catch((error) => console.error("Error fetching data:", error));

    socketIo.on("message", (message) => {
      // * SE CREA UN OBJETO RAMDON TEMPORAL PARA LA VISUALIZACION EN TIEMPO REAL
      if (sender && receiver) {
        const newMessage = {
          text: message,
          sender: receiver,
          receiver: sender,
          createdAt: new Date().toISOString(), // Agrega la fecha de creación si es necesario
        };
        setAllMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    return () => {
      socketIo.off("message");
    };
  }, [sender, receiver,socketIo, messageText]);
    

  const sendMessage = (e) => {
    e.preventDefault();
    if (!socketIo || !messageText.trim()) {
      return;
    }
    const newMessage = {
      text: messageText,
      sender: sender,
      receiver: receiver,
      createdAt: new Date().toISOString(), // Agrega la fecha de creación si es necesario
    };
    setAllMessages((prevMessages) => [...prevMessages, newMessage]);
    
    socketIo.emit("sendMessage", messageText);
    axiosPostMessage({
      text: messageText,
      senderId: sender?.id,
      receiverId: receiver?.id,
    });

    setMessageText("");
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
            {/* <CollapsedBar
              title={"Servicios"}
              company={company}
              intState={true}
            />
            <CollapsedBar
              title={"Portfolio"}
              company={company}
              intState={true}
            /> */}
            <CollapsedBar
              title={"Licitaciones"}
              company={company}
              intState={true}
            />
          </div>
         
          <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center justify-center"
              onClick={() => setShowPopup(true)}
            >
              <div className="flex items-center justify-center w-16 h-16 overflow-hidden rounded-full mr-2">
                <img
                  className="w-full h-full object-cover"
                  src={company.profilePicture}
                  alt="Photo"
                />
              </div>
              <span className="text-center">Inicia un Chat con {company.name}</span>
          </button>
    <Popup show={showPopup} onClose={() => setShowPopup(false)}>
              
              <h2>Chat</h2>
                  <div className="max-h-[400px] overflow-y-auto">
                    <div className="max-h-[300px] overflow-y-auto">
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
                    <form className="flex mt-4" onSubmit={sendMessage}>
                      <input
                        type="text"
                        className="flex-1 mr-2 border rounded px-4 py-2 focus:outline-none"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Type your message..."
                      />
                      <button
                        type="submit"
                        className="bg-blue-400 hover:bg-blue-600 text-black px-4 py-2 rounded"
                      >
                        Send
                      </button>
                    </form>
                  </div>

          </Popup>
        </div>
      )}
    </>
  );
}

export default Page;

