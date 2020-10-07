const Messages = require('../models/messages');

async function sendMessage(req, res) {
    if (!req.body.message)
        return res.send({ error: 'Type ...' })

    try {
        const message = await Messages.create(req.body);

        return res.status(200).send({ message });
    } catch (err) {
        return res.status(500).send({ error: 'Error on server' });
    };
};

async function getMessages(req, res) {
    const { room_id } = req.body;

    if (!room_id) 
        return res.status(400).send({ error: 'Undefined room' });

    try {
        const messages = await Messages.find({ room_id });

        return res.status(200).send({ messages });
    } catch (err) {
        return res.status(500).send({ error: 'Error on server' });
    };
};

async function deleteMessage(req, res) {
    const { _id } = req.body 

    if (_id) {
        try {
            await Messages.findByIdAndDelete({ _id: _id })
        } catch (err) {
            return res.status(500).send({ error: 'Error on server' })
        }
    }
}

async function deleteMessages(room_id) {
    try {
        await Messages.deleteMany({ room_id })
    } catch (err) {
        console.log('error')
    }
}

module.exports = {
    getMessages,
    sendMessage,
    deleteMessage,
    deleteMessages
};