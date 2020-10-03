const mongoose = require('../database/db');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    imageUrl: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('user', UserSchema);
