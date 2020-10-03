const DOOR = process.env.PORT || 3001;
const DB_CONNECT = 'mongodb+srv://admin:wFXCc6VZ7uYnLQl8@cluster0.8kixg.mongodb.net/whatsapp?retryWrites=true&w=majority';

const USER_API = {
    GET: '/api/user/get',
    REGISTER: '/api/user/register',
    AUTH: '/api/user/auth',
};

const MESSAGES_API = {
    SEND: '/api/messages/send',
    GET: '/api/messages/get',
};

const ROOMS_API = {
    GET: '/api/rooms/get',
    CREATE: '/api/rooms/create',
    DELETE: '/api/rooms/delete'
};

module.exports = {
    DOOR,
    DB_CONNECT,
    USER_API,
    MESSAGES_API,
    ROOMS_API
};