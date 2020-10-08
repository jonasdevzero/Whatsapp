const mongoose = require('mongoose');
const Pusher = require('pusher');
const { DB_CONNECT } = require('../configs/constants')

mongoose.connect(DB_CONNECT, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection;

const pusher = new Pusher({
    appId: '1083901',
    key: '405beddf008e5ab04f57',
    secret: 'cc97b4e4c5c3255f373e',
    cluster: 'eu',
    encrypted: true
  });


db.once('open', () => {
    console.log('DB connected');

    const messages = db.collection('messages');
    const changeStream = messages.watch();

    const rooms = db.collection('rooms');
    const roomsStream = rooms.watch();

    changeStream.on('change', change => {
        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                username: messageDetails.username,
                message: messageDetails.message,
                room_id: messageDetails.room_id,
                timestamp: messageDetails.timestamp,
            });
        } else {
            console.log('Error triggered Pusher');
        }
    });

    roomsStream.on('change', change => {
        if (change.operationType === 'insert') {
            const roomDetails = change.fullDocument;
            pusher.trigger('rooms', 'inserted', {
                _id: roomDetails._id,
                name: roomDetails.name,
                image: roomDetails.image
            });
        } else if (change.operationType === 'delete') {
            pusher.trigger('rooms', 'deleted', {
                _id: change.documentKey._id
            })
        } else if (change.operationType === 'update') {
            pusher.trigger('rooms', 'updated', {
                _id: change.documentKey._id,
                name: change.updateDescription.updatedFields.name,
                image: change.updateDescription.updatedFields.image
            })
        } else {
            console.log('Error triggered Pusher');
        }
    })
});

module.exports = mongoose