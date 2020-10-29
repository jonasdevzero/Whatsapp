const Rooms = require('../models/rooms');
const Messages = require('../models/messages');
const { where } = require('../models/rooms');

module.exports = {
    async index(req, res) {
        try {
            const rooms = await Rooms.find();
    
            return res.status(200).json({ rooms });
        } catch (err) {
            return res.status(500).json({ error: 'Error on server' });
        };
    },

    async create(req, res) {
        const { name } = req.body;
    
        if (!name)
            return res.json({ error: 'Choose a name for the Room' });
    
        try {
            await Rooms.create(req.body);
            const rooms = await Rooms.find(); 
    
            return res.status(200).json({ rooms });
        } catch (err) {
            return res.status(500).json({ error: 'Error on server' });
        };
    },

    async update(req, res) {
        const { username, _id, data } = req.body;
    
        try {
            const room = await Rooms.findOne({ _id })
            if (username !== room.createdBy) {
                return res.json({ error: 'It is not possible change the data of this room' });
            };

            await Rooms.findOneAndUpdate({ _id }, data);

            const rooms = await Rooms.find();
            return res.status(200).json({ rooms });
        } catch (err) {
            return res.status(500).json({ error: 'Error on server' });
        };
    },

    async delete(req, res) {
        const { _id, username } = req.query;
    
        if (_id === '5f78e066e4720631e41f40c7' || _id === '5f790dcfc6eb7b2688688112') 
            return res.json({ error: 'It is not possible to delete this room'});
        
        try {
            const room = await Rooms.findOne({ _id });
            if (username !== room.createdBy) {
                return res.json({ error: 'Only the creator that room can delete it' });
            };
            
            await Messages.deleteMany({ room_id: _id })
            await Rooms.findByIdAndDelete(_id);

            return res.status(200);
        } catch (err) {
            return res.status(500).json({ error: 'Error on server' });
        };
    },
};
