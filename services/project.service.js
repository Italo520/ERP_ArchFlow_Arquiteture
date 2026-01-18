import api from './api';

const ProjectService = {
    getAllProjects: async () => {
        const response = await api.get('/projects');
        return response.data;
    },

    createProject: async (projectData) => {
        const response = await api.post('/projects', projectData);
        return response.data;
    },

    getProjectById: async (id) => {
        const response = await api.get(`/projects/${id}`);
        const project = response.data;
        // Ensure stages exist if not present
        if (!project.stages) {
            project.stages = [];
        }
        return project;
    },

    // Placeholder for stage management - implementing strictly what was requested (Task management)
    // Stage management endpoints would need to be added to backend to fully support these.
    addStage: async (projectId, stageName) => {
        console.warn('addStage not implemented in backend yet');
        return null;
    },

    updateStage: async (projectId, stageId, newName) => {
        console.warn('updateStage not implemented in backend yet');
        return null;
    },

    deleteStage: async (projectId, stageId) => {
        console.warn('deleteStage not implemented in backend yet');
        return false;
    },

    reorderStages: async (projectId, newStagesOrder) => {
        console.warn('reorderStages not implemented in backend yet');
        return false;
    }
};

export default ProjectService;
