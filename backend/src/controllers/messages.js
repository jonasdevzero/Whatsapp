const Messages = require('../models/messages');

module.exports = {
    async index(req, res) {
        const { room_id } = req.query;

        if (!room_id) {
            return res.status(400).json({ error: 'Undefined room' });
        }

        try {
            const messages = await Messages.find({ room_id });

            return res.status(200).json({ messages });
        } catch (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        };
    },

    async create(req, res) {
        if (!req.body.message)
            return res.json({ error: 'Type ...' })

        try {
            const message = await Messages.create(req.body);

            return res.status(200).json({ message });
        } catch (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        };
    },
};
