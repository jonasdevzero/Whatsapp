const Messages = require('../models/messages');

async function sendMessage(req, res) {
    try {
        const message = await Messages.create(req.body);

        return res.status(200).send({ message });
    } catch (err) {
        res.status(500).send({ error: 'Error on server' });
    };
};

async function getMessages(req, res) {
    try {
        const messages = await Messages.find()

        res.status(200).send({ messages });
    } catch (err) {
        res.status(500).send({ error: 'Error on server' });
    }
}

module.exports = {
    getMessages,
    sendMessage
}