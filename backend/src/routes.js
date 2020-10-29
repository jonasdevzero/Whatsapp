const router = require('express').Router();

const UsersController = require('./controllers/users');
const MessagesController = require('./controllers/messages');
const RoomsController = require('./controllers/rooms');

router.get('/', (req, res) => res.send('Server Running'));

router.post('/api/users/create', UsersController.create);
router.post('/api/users/login', UsersController.login);
router.post('/api/users/auth', UsersController.auth, UsersController.show);
router.put('/api/users', UsersController.update);

router.get('/api/messages', MessagesController.index);
router.post('/api/messages', MessagesController.create);

router.get('/api/rooms', RoomsController.index);
router.post('/api/rooms', RoomsController.create);
router.delete('/api/rooms', RoomsController.delete);
router.put('/api/rooms/:id', RoomsController.update);

module.exports = router;