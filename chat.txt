"use client";
import { useState, useEffect, useCallback } from "react";
import Popup from "./components/popup";
import Messages from "./components/Messages";
import { axiosGetAllMessages, axiosGetAllUsers, axiosPostMessage } from "@/app/Func/axios";
import { getCompanyId, getCompanyName, getUserId } from "@/app/Func/sessionStorage";
import io from "socket.io-client";

const socketIo = io("http://localhost:3001");

const Chat = ({ id, company }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [buttonChat, setButtonChat] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [sender, setSender] = useState(null);

  const companyId = getCompanyId();
  const userId = getUserId();
  const myName = getCompanyName();

  let usuariosUnicos = new Set();

  useEffect(() => {
    socketIo.emit("authenticate", { companyId });

    socketIo.on("connect", () => {
      console.log("Connected to server");
    });
  }, []);

  useEffect(() => {
    axiosGetAllUsers(setAllUsers);
    axiosGetAllMessages(setAllMessages);
  }, []);

  useEffect(() => {
    if (allUsers.length > 0 && id) {
      const foundReceiver = allUsers.find((user) => user.company.id === id);
      const foundSender = allUsers.find((user) => user.company.id === companyId);
      setReceiver(foundReceiver);
      setSender(foundSender);
      if (foundReceiver) {
        setSelectedCompany(foundReceiver.company.name);
      }
    }
  }, [allUsers, id, companyId]);

  useEffect(() => {
    if (selectedCompany) {
      const filtered = allMessages.filter((message) => {
        const senderCompany = message.sender.company ? message.sender.company.name : message.sender.Company.name;
        const receiverCompany = message.receiver.company ? message.receiver.company.name : message.receiver.Company.name;
        return (
          (senderCompany === selectedCompany && receiverCompany === myName) ||
          (senderCompany === myName && receiverCompany === selectedCompany)
        );
      });
      const newReceiver = allUsers.find((user) => user.company.name === selectedCompany);
      setFilteredMessages(filtered);
      setReceiver(newReceiver);
    } else {
      setFilteredMessages(allMessages);
    }
  }, [allMessages, selectedCompany, myName, allUsers]);

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

  useEffect(() => {
    if (!socketIo) return;

    const messageListener = (message) => {
      const { _message, _sender, _receiver } = message;

      const foundReceiver = allUsers.find((user) => user.company.id === _sender);
      const foundSender = allUsers.find((user) => user.company.id === _receiver);

      if (foundSender && foundReceiver) {
        const newMessage = {
          text: _message,
          sender: foundReceiver,
          receiver: foundSender,
          createdAt: new Date().toISOString(),
        };
        setAllMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    socketIo.on("message", messageListener);
    return () => {
      socketIo.off("message", messageListener);
    };
  }, [allMessages, allUsers, sender, receiver]);

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
    [messageText, sender, receiver, companyId, id]
  );

  const handleSelectCompany = (companyName) => {
    setSelectedCompany(companyName);
  };

  return (
    <>
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
              {buttonChat.map((item) => (
                <button
                  key={item}
                  className={`w-full px-2 py-1 mb-2 text-sm text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    selectedCompany === item ? "bg-blue-500" : "bg-gray-600 hover:bg-gray-800"
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
    </>
  );
};

export default Chat;
