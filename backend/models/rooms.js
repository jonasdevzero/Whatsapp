const mongoose = require('../database/db');

const RoomsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('rooms', RoomsSchema);