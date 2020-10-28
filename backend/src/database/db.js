const mongoose = require('mongoose');
const pusherConnection = require('./pusher');

mongoose.connect(process.env.DB_CONNECT, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;

db.once('open', () => pusherConnection(db));

module.exports = mongoose