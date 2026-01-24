import { createProject } from "@/app/actions/project";
import { prisma } from "@/lib/prisma";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import { PrismaClient } from "@prisma/client";

jest.mock("next/cache", () => ({
    revalidatePath: jest.fn(),
}));

jest.mock("next/navigation", () => ({
    redirect: jest.fn(),
}));

jest.mock("@/auth", () => ({
    auth: jest.fn(() => Promise.resolve({ user: { id: 'user-1' } })),
}));

jest.mock("@/lib/prisma", () => {
    const { mockDeep } = require("jest-mock-extended");
    return {
        __esModule: true,
        prisma: mockDeep(),
    };
});

const mockPrisma = prisma as unknown as DeepMockProxy<PrismaClient>;

describe("Project Actions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a project successfully", async () => {
        const projectData = {
            name: "New Office",
            status: "PLANNING",
            totalArea: 150,
        };

        mockPrisma.project.create.mockResolvedValue({
            id: "proj-1",
            ...projectData,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            clientName: null,
            imageUrl: null,
            address: null,
            startDate: null,
            deliveryDate: null,
            projectType: null,
            ownerId: "user-1",
            clientId: null,
        } as any);

        const result = await createProject(projectData);

        expect(result.success).toBe(true);
        expect(mockPrisma.project.create).toHaveBeenCalled();
    });
});
