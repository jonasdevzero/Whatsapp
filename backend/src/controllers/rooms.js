const Rooms = require('../models/rooms');
const { deleteMessages } = require('./messages');

module.exports = {
    async index(req, res) {
        try {
            const rooms = await Rooms.find();
    
            return res.status(200).json(rooms);
        } catch (err) {
            return res.status(500).json({ error: 'Error on server' });
        };
    },

    async create(req, res) {
        const { name } = req.body;
    
        if (!name)
            return res.json({ error: 'Choose a name for the Room' });
    
        try {
            const newRoom = await Rooms.create(req.body);
    
            return res.status(200).json({ newRoom });
        } catch (err) {
            return res.status(500).json({ error: 'Error on server' });
        };
    },

    async update(req, res) {
        const { username, room, data } = req.body;
    
        if (username !== room.createdBy) 
            return res.json({ error: 'It is not possible change the data of this room' });
    
        const _id = room._id
        
    
        try {
            const roomUpdated = await Rooms.findOneAndUpdate({ _id: _id }, data, { new: true })
            return res.status(200).json({ roomUpdated })
        } catch (err) {
            return res.status(500).json({ error: 'Error on server' })
        };
    },

    async delete(req, res) {
        const { room, username } = req.body;
        const _id = room._id
    
        if (username !== room.createdBy)
            return res.json({ error: 'Only the creator that room can delete it' })
    
        if (_id === '5f78e066e4720631e41f40c7' || _id === '5f790dcfc6eb7b2688688112') 
            return res.json({ error: 'It is not possible to delete this room'})
        
        try {
            deleteMessages(_id )
            const roomDeleted = await Rooms.findByIdAndDelete({ _id });
    
            return res.status(200).json({ roomDeleted });
        } catch (err) {
            return res.status(500).json({ error: 'Error on server' });
        };
    },
};
