import api from './api';

const AuthService = {
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    register: async (name, email, password) => {
        const response = await api.post('/auth/register', {
            fullName: name,
            email,
            password
        });
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    getCurrentUser: () => {
        return localStorage.getItem('token');
    }
};

export default AuthService;
