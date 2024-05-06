const { createMessageController, getAllMessagesController } = require("../controllers/messagesController");

const createMessageHandler = async (req, res) => {
  try {
    const message = req.body;

    const createMessage = await createMessageController(message);

    return res.status(201).json(createMessage);
  } catch (error) {
    console.log("Error en createMessageHandler por:", error)
    return res.status(error.status || 500).json({ error: error.message });
  }
};

const getAllMessagesHandler = async (_, res) => {
  try {
    const messages = await getAllMessagesController();
    
    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error en getAllMessagesHandler por:", error)
    return res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = { createMessageHandler, getAllMessagesHandler };
