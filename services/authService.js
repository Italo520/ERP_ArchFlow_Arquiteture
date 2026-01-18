import api from './api';
import Cookies from 'js-cookie';

const authService = {
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            if (response.data.token) {
                Cookies.set('token', response.data.token, { expires: 7 }); // 7 dias
                Cookies.set('user', JSON.stringify(response.data.user), { expires: 7 });
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
        Cookies.remove('token');
        Cookies.remove('user');
    },

    getCurrentUser: () => {
        const userCookie = Cookies.get('user');
        return userCookie ? JSON.parse(userCookie) : null;
    },
};

export default authService;

