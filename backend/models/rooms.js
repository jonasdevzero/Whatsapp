const mongoose = require('../database/db');

const RoomsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('rooms', RoomsSchema);