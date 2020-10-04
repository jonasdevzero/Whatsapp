const router = require('express').Router();
const { 
    USER_API, 
    MESSAGES_API,
    ROOMS_API 
} = require('./constants');

router.get('/', (req, res) => res.send('Server Running'));

// User api routes
const { getUser, registerUser, authUser, updateUser } = require('../api/user');
router.post(USER_API.GET, getUser);
router.post(USER_API.REGISTER, registerUser);
router.post(USER_API.AUTH, authUser);
router.post(USER_API.UPDATE, updateUser);

// Messages api routes
const { sendMessage, getMessages } = require('../api/messages');
router.post(MESSAGES_API.GET, getMessages);
router.post(MESSAGES_API.SEND, sendMessage);

// Rooms Api routes
const { getRooms, createRoom, deleteRoom, updateRoom } = require('../api/rooms');
router.get(ROOMS_API.GET, getRooms);
router.post(ROOMS_API.CREATE, createRoom);
router.post(ROOMS_API.DELETE, deleteRoom);
router.post(ROOMS_API.UPDATE, updateRoom);

module.exports = router;