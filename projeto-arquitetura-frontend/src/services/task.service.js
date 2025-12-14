import api from './api';

const TaskService = {
    createTask: async (taskData) => {
        const response = await api.post('/tasks', taskData);
        return response.data;
    },

    updateTask: async (taskId, taskData) => {
        const response = await api.patch(`/tasks/${taskId}`, taskData);
        return response.data;
    },

    updateTaskStage: async (taskId, stageId) => {
        const response = await api.patch(`/tasks/${taskId}/stage`, { stageId });
        return response.data;
    },

    getTasksByProject: async (projectId) => {
        const response = await api.get(`/tasks?projectId=${projectId}`);
        return response.data;
    }
};

export default TaskService;
