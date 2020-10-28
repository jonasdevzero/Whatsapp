const Pusher = require('pusher');

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER.SECRET,
    cluster: 'eu',
    encrypted: true
});

function pusherConnection(db) {
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
}; 

module.exports = pusherConnection;