const Rooms = require('../models/rooms');

async function getRooms(req, res) {
    try {
        const rooms = await Rooms.find();

        return res.status(200).send(rooms);
    } catch (err) {
        return res.status(500).send({ error: 'Error on server' });
    };
};

async function createRoom(req, res) {
    const { name } = req.body;

    if (!name)
        return res.status(400).send({ error:  'Choose a name' });

    try {
        Rooms.create(req.body);

        return res.status(200).send({ name });
    } catch (err) {
        return res.status(500).send({ error: 'Error on server' });
    };
};

async function deleteRoom(req, res) {
    const { _id } = req.body;

    try {
        const roomDeleted = await Rooms.findByIdAndDelete({ _id });

        return res.status(200).send({ roomDeleted });
    } catch (err) {
        return res.status(500).send({ error: 'Error on server' });
    };
};

async function updateRoom(req, res) {
    const { _id } = req.body; 
    delete req.body._id

    try {
        const roomUpdated = await Rooms.findOneAndUpdate({ _id: _id }, req.body, { new: true })
        return res.status(200).send({ roomUpdated })
    } catch (err) {
        return res.status(500).send({ error: 'Error on server' })
    };
};

module.exports = {
    getRooms,
    createRoom,
    deleteRoom,
    updateRoom
};