const { Messages, Users, Companies } = require("../db");
const { formatDate } = require("../services/formatDate.JS");

const createMessageController = async (message) => {
  const createMessage = await Messages.create({ 
    text: message.text, 
    senderId: message.senderId, 
    receiverId: message.receiverId, 
  });

  if (!createMessage) {
    const error = new Error(`Messages not created.`);
    error.status = 404;
    throw error;
  }

  return createMessage;
};

const getAllMessagesController = async () => {
  const messages = await Messages.findAll({
    include: [
      {
        model: Users,
        as: 'sender',
        attributes: ['id', 'firstName', 'lastName', 'email'],
        include: [
          {
            model: Companies,
            attributes: ['id', 'name', 'profilePicture', 'bannerPicture'],
          }
        ],
      },
      {
        model: Users,
        as: 'receiver',
        attributes: ['id', 'email'],
        include: [
          {
            model: Companies,
            attributes: ['id', 'name', 'profilePicture', 'bannerPicture'],
          }
        ],
      },
    ],
  });

  const cleanMessages = messages.map(function(el) {
    return {
      id: el.id,
      text: el.text,
      sender: el.sender,
      receiver: el.receiver,
      createdAt: formatDate(el.createdAt),
      updatedAt: formatDate(el.updatedAt),
    }
  });

  return cleanMessages;
};

module.exports = { createMessageController, getAllMessagesController }