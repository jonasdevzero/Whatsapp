const express = require('express');
const mongoose =  require('mongoose');
const cors  =  require('cors');
const Messages =  require('./dbMessages');
const Pusher = require('pusher');

const app = express();
const DOOR = process.env.PORT || 3001;
const DB_CONNECT = 'mongodb+srv://admin:wFXCc6VZ7uYnLQl8@cluster0.8kixg.mongodb.net/whatsapp?retryWrites=true&w=majority';

const pusher = new Pusher({
    appId: '1083901',
    key: '405beddf008e5ab04f57',
    secret: 'cc97b4e4c5c3255f373e',
    cluster: 'eu',
    encrypted: true
  });

app.use(cors());
app.use(express.json());

mongoose.connect(DB_CONNECT, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
    console.log('DB connected');

    const messages = db.collection('messages');
    const changeStream = messages.watch();

    changeStream.on('change', change => {
        console.log(change);

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails,
                timestamp: messageDetails.timestamp
            });
        } else {
            console.log('Error triggered Pusher');
        }
    });
});

app.get('/', (req, res) => {
    res.status(200).send('Server Running');
});

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else{
            res.status(200).send(data)
        }
    });
});

app.post('/api/messages/new', (req, res) => {
    const message = req.body;

    Messages.create(message, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(`New message created ${data}`);
        }
    });
});

app.listen(DOOR, _ => console.log(`Server running on door: ${DOOR}`));