import api from './api';

export async function login(data) {
    const response = await api.post('/api/users/login', data);
    const { user, error } = response.data;

    if (error) return { error };

    localStorage.setItem('authUser', JSON.stringify(user));
    return { user };
};

export async function createUser(data) {
    const response = await api.post('/api/users/auth', data);
    const { user, error } = response.data;

    if (error) return { error };

    localStorage.setItem('authUser', JSON.stringify(user));
    return { user };
};

export async function updateUser(data) {
    const response = await api.put('/api/users', data);
    const { user, error } = response.data;

    if (error) return { error };

    localStorage.setItem('authUser', JSON.stringify(user));
    return { user };
};
