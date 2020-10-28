import api from './api';
import * as API_ROUTES from './apiRoutes';

export async function login(data) {
    const response = await api.post(API_ROUTES.AUTH_USER, data);
    const { user, error } = response.data;

    if (error) return { error };

    localStorage.setItem('authUser', JSON.stringify(user));
    return { user };
};

export async function createUser(data) {
    const response = await api.post(API_ROUTES.REGISTER_USER, data);
    const { user, error } = response.data;

    if (error) return { error };

    localStorage.setItem('authUser', JSON.stringify(user));
    return { user };
};

export async function updateUser(data) {
    const response = await api.put(API_ROUTES.UPDATE_USER, data);
    return response.data;
};
