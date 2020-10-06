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
        return res.send({ error: 'Choose a name for the Room' });

    try {
        const newRoom = await Rooms.create(req.body);

        return res.status(200).send({ newRoom });
    } catch (err) {
        return res.status(500).send({ error: 'Error on server' });
    };
};

async function deleteRoom(req, res) {
    const { room, username } = req.body;
    const _id = room._id

    if (username !== room.createdBy)
        return res.send({ error: 'Only the creator that room can delete it' })

    if (_id === '5f78e066e4720631e41f40c7' || _id === '5f790dcfc6eb7b2688688112') 
        return res.send({ error: 'It is not possible to delete this room'})
    
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