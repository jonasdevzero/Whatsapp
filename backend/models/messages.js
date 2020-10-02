const mongoose = require('../database/db');

const whatsappSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: Date.now,
    },
    received: {
        type: Boolean,
        requied: true,
    },
});

module.exports = mongoose.model('messages', whatsappSchema);