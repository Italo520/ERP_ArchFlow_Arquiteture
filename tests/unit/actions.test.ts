import { createClient } from "@/app/actions/client";
import { prisma } from "@/lib/prisma";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import { PrismaClient } from "@prisma/client";

jest.mock("next/cache", () => ({
    revalidatePath: jest.fn(),
}));

jest.mock("next/navigation", () => ({
    redirect: jest.fn(),
}));

jest.mock("@/lib/prisma", () => {
    const { mockDeep } = require("jest-mock-extended");
    return {
        __esModule: true,
        prisma: mockDeep(),
    };
});

const mockPrisma = prisma as unknown as DeepMockProxy<PrismaClient>;

describe("Client Actions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a client successfully", async () => {
        const clientData = {
            name: "Test Corp",
            email: "test@corp.com",
        };

        mockPrisma.client.create.mockResolvedValue({
            id: "1",
            ...clientData,
            status: "PROSPECT",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            phone: null,
            website: null,
            legalType: null,
            document: null,
            razaoSocial: null,
            inscricaoEstadual: null,
            address: null,
            geoLocation: null,
            category: null,
            rating: null,
            totalSpent: null,
            avatar: null,
            notes: null,
            contactPreference: null,
            userId: null,
            tags: [],
            metadata: null,
            lastInteractionAt: null,
        } as any);

        const result = await createClient(clientData);

        expect(result.success).toBe(true);
        expect(mockPrisma.client.create).toHaveBeenCalledWith({
            data: expect.objectContaining({
                name: "Test Corp",
                email: "test@corp.com",
            }),
        });
    });

    it("should fail to create client with invalid email", async () => {
        const invalidData = {
            name: "Test Corp",
            email: "invalid-email",
        };

        const result = await createClient(invalidData); // Zod caught this

        expect(result.error).toBeDefined();
        expect(mockPrisma.client.create).not.toHaveBeenCalled();
    });
});
