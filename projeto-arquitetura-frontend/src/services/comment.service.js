// @ts-ignore
import api from './api';

export const commentService = {
    getComments: async (taskId) => {
        const response = await api.get(`/api/v1/comments/task/${taskId}`);
        return response.data;
    },

    addComment: async (taskId, richText) => {
        const response = await api.post('/api/v1/comments', {
            taskId,
            richText,
        });
        return response.data;
    },

    getUploadUrl: async (fileName, contentType) => {
        const response = await api.post('/api/v1/storage/upload-url', {
            fileName,
            contentType
        });
        return response.data.url;
    }
};
