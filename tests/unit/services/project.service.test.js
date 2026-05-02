import ProjectService from '@/services/project.service';
import api from '@/services/api';

jest.mock('@/services/api');

describe('ProjectService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllProjects', () => {
        it('should fetch all projects successfully', async () => {
            const mockProjects = [{ id: '1', name: 'Project 1' }, { id: '2', name: 'Project 2' }];
            api.get.mockResolvedValue({ data: mockProjects });

            const result = await ProjectService.getAllProjects();

            expect(api.get).toHaveBeenCalledWith('/projects');
            expect(result).toEqual(mockProjects);
        });
    });

    describe('createProject', () => {
        it('should create a project successfully', async () => {
            const projectData = { name: 'New Project' };
            const mockResponse = { id: '3', ...projectData };
            api.post.mockResolvedValue({ data: mockResponse });

            const result = await ProjectService.createProject(projectData);

            expect(api.post).toHaveBeenCalledWith('/projects', projectData);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('getProjectById', () => {
        it('should fetch a project by id and ensure stages exist', async () => {
            const projectId = '1';
            const mockProject = { id: projectId, name: 'Project 1' };
            api.get.mockResolvedValue({ data: mockProject });

            const result = await ProjectService.getProjectById(projectId);

            expect(api.get).toHaveBeenCalledWith(`/projects/${projectId}`);
            expect(result.stages).toEqual([]);
            expect(result.id).toBe(projectId);
        });

        it('should return project with existing stages', async () => {
            const projectId = '1';
            const mockProject = { id: projectId, name: 'Project 1', stages: [{ id: 's1', name: 'Stage 1' }] };
            api.get.mockResolvedValue({ data: mockProject });

            const result = await ProjectService.getProjectById(projectId);

            expect(result.stages).toEqual(mockProject.stages);
        });
    });

    describe('placeholder methods', () => {
        it('addStage should log warning and return null', async () => {
            const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
            const result = await ProjectService.addStage('p1', 'Stage');
            expect(consoleSpy).toHaveBeenCalledWith('addStage not implemented in backend yet');
            expect(result).toBeNull();
            consoleSpy.mockRestore();
        });

        it('updateStage should log warning and return null', async () => {
            const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
            const result = await ProjectService.updateStage('p1', 's1', 'New Name');
            expect(consoleSpy).toHaveBeenCalledWith('updateStage not implemented in backend yet');
            expect(result).toBeNull();
            consoleSpy.mockRestore();
        });

        it('deleteStage should log warning and return false', async () => {
            const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
            const result = await ProjectService.deleteStage('p1', 's1');
            expect(consoleSpy).toHaveBeenCalledWith('deleteStage not implemented in backend yet');
            expect(result).toBe(false);
            consoleSpy.mockRestore();
        });

        it('reorderStages should log warning and return false', async () => {
            const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
            const result = await ProjectService.reorderStages('p1', []);
            expect(consoleSpy).toHaveBeenCalledWith('reorderStages not implemented in backend yet');
            expect(result).toBe(false);
            consoleSpy.mockRestore();
        });
    });
});
