import api from './api';

const TaskService = {
    createTask: async (taskData) => {
        const response = await api.post('/api/v1/tasks', taskData);
        return response.data;
    },

    updateTask: async (taskId, taskData) => {
        const response = await api.patch(`/api/v1/tasks/${taskId}`, taskData);
        return response.data;
    },

    updateTaskStage: async (taskId, stageId) => {
        const response = await api.patch(`/api/v1/tasks/${taskId}/stage`, { stageId });
        return response.data;
    },

    getTasksByProject: async (projectId) => {
        const response = await api.get(`/api/v1/tasks?projectId=${projectId}`);
        return response.data;
    },

    getTaskById: async (taskId) => {
        const response = await api.get(`/api/v1/tasks/${taskId}`);
        return response.data;
    }
};

export default TaskService;
