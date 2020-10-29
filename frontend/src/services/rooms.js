import api from './api';

export async function getRooms() {
    const response = await api.get('/api/rooms');
    return response.data.rooms;
}

export async function createRoom(data) {
    const response = await api.post('/api/rooms', data);
    return response.data;
};

export async function updateRoom(data) {
    const response = await api.put('/api/rooms', data);
    return response.data;
};

export async function deleteRoom({ room, username }) {
    const response = await api.delete(`/api/rooms?_id=${room._id}&username=${username}`);
    return response.data;
};
