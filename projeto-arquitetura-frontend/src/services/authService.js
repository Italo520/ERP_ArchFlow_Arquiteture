import api from './api';

const authService = {
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user)); // Assuming the response has a user object
            }
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    register: async (fullName, email, password) => {
        try {
            const response = await api.post('/auth/register', { fullName, email, password });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    },
};

export default authService;
