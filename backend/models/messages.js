const mongoose = require('../database/db');

const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    room: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('messages', MessageSchema);