const Messages = require('../models/messages');

async function sendMessage(req, res) {
    try {
        const message = await Messages.create(req.body);

        return res.status(200).send({ message });
    } catch (err) {
        return res.status(500).send({ error: 'Error on server' });
    };
};

async function getMessages(req, res) {
    const { room } = req.body;

    if (!room) 
        return res.status(400).send({ error: 'Undefined room' });

    try {
        const messages = await Messages.find({ room });

        return res.status(200).send({ messages });
    } catch (err) {
        return res.status(500).send({ error: 'Error on server' });
    };
};

module.exports = {
    getMessages,
    sendMessage
};