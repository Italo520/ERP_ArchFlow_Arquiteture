import { createProject, updateProject, duplicateProject, listProjects, deleteProject } from "@/app/actions/project";


describe("Project Management Integration Tests", () => {
    let testProjectId: string;

    it("should create a new project", async () => {
        const projectData = {
            name: "Integração Teste",
            status: "PLANNING",
        };

        console.log("Calling createProject with:", projectData);
        const result = await createProject(projectData as any);
        console.log("Result received:", result);

        expect(result).toBeDefined();
        expect(result.success).toBe(true);
        testProjectId = result.data.id;
    });

    it("should list projects", async () => {
        const result = await listProjects();
        expect(result.success).toBe(true);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it("should update project", async () => {
        const result = await updateProject(testProjectId, { name: "Updated" } as any);
        expect(result.success).toBe(true);
        expect(result.data.name).toBe("Updated");
    });

    it("should duplicate project", async () => {
        const result = await duplicateProject(testProjectId, "Copy");
        expect(result.success).toBe(true);
        expect(result.data.name).toBe("Copy");
    });

    it("should delete project", async () => {
        const result = await deleteProject(testProjectId);
        expect(result.success).toBe(true);
    });
});
