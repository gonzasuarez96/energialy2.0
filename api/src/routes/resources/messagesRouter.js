const { Router } = require('express');
const { createMessageHandler, getAllMessagesHandler } = require('../../handlers/messageHandler');

const messagesRouter = Router();

messagesRouter.get('/', getAllMessagesHandler);
messagesRouter.post('/', createMessageHandler);

module.exports = messagesRouter;
