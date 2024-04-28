const { Message, Users, Companies } = require("../db");
const { formatDate } = require("../services/formatDate.JS");

const createMessage = async (req, res,) => {
  try {
    const message = req.body;
    // console.log("message", message)

    const createMessage = await Message.create({ 
      text: message.text, 
      remitenteId: message.remitenteId, 
      destinatarioId: message.destinatarioId, 
    });
    // console.log("createMessage:",JSON.parse(JSON.stringify(createMessage)))

    return res.status(201).json(createMessage);
  } catch (error) {
    console.log("Error en createMessage por:", error)
  }
};

const getAllMessages = async (_, res) => {
  try {
    const messages = await Message.findAll({
      include: [
        {
          model: Users,
          as: 'remitente',
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
          as: 'destinatario',
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
        remitente: el.remitente,
        destinatario: el.destinatario,
        createdAt: formatDate(el.createdAt),
        updatedAt: formatDate(el.updatedAt),
      }
    })
    
    return res.status(200).json(cleanMessages);
  } catch (error) {
    console.log("Error en getAllMessages por:", error)
  }
};

module.exports = { createMessage, getAllMessages };
