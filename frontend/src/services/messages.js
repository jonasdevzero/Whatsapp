import api from './api';

export async function getMessages(room_id) {
    const response = await api.get(`/api/messages?room_id=${room_id}`);
    return response.data.messages;
};

export async function createMessage(data) {
    await api.post('/api/messages', data);
};