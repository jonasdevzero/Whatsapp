const router = require('express').Router();

const UsersController = require('./controllers/users');
const MessagesController = require('./controllers/messages');
const RoomsController = require('./controllers/rooms');

router.get('/', (req, res) => res.send('Server Running'));

router.post('/api/users/create', UsersController.create);
router.post('/api/users/auth', UsersController.auth);
router.put('/api/users/update', UsersController.update);

router.get('api/messages/:room_id', MessagesController.index);
router.post('api/messages', MessagesController.create);
router.delete('api/messages', MessagesController.delete);

router.get('/api/rooms', RoomsController.index);
router.post('/api/rooms', RoomsController.create);
router.delete('/api/rooms', RoomsController.delete);
router.put('/api/rooms', RoomsController.update);

module.exports = router;