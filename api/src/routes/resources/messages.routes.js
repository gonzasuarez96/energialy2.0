const { Router } = require('express');
const { createMessage, getAllMessages } = require('../../handlers/messageHandler');

const messagesRouter = Router();

messagesRouter.get('/', getAllMessages);
messagesRouter.post('/', createMessage);

module.exports = messagesRouter;
