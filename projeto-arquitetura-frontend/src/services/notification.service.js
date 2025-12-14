import api from './api';

const NotificationService = {
    getNotifications: async () => {
        const response = await api.get('/api/v1/notifications');
        return response.data;
    },

    getUnreadCount: async () => {
        const response = await api.get('/api/v1/notifications/unread-count');
        return response.data;
    },

    markAsRead: async (notificationId) => {
        await api.patch(`/api/v1/notifications/${notificationId}/read`);
    },
};

export default NotificationService;
