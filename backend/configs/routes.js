const router = require('express').Router();
const { USER_API, MESSAGES_API } = require('./constants');

router.get('/', (req, res) => res.send('Server Running'));

// User api routes
const { getUser, registerUser, authUser } = require('../api/user');
router.get(USER_API.GET, getUser);
router.post(USER_API.REGISTER, registerUser);
router.post(USER_API.AUTH, authUser);

// Messages api routes
const { sendMessage, getMessages } = require('../api/messages');
router.get(MESSAGES_API.GET, getMessages);
router.post(MESSAGES_API.SEND, sendMessage);


module.exports = router;