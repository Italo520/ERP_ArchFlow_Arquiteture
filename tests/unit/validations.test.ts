import { clientSchema, activitySchema } from "@/lib/validations";
import { ActivityType, ClientStatus } from "@prisma/client";

describe("Validations", () => {
    describe("Client Schema", () => {
        it("should validate a correct client", () => {
            const validClient = {
                name: "Acme Corp",
                email: "contact@acme.com",
                status: ClientStatus.ACTIVE,
            };
            const result = clientSchema.safeParse(validClient);
            expect(result.success).toBe(true);
        });

        it("should fail with invalid email", () => {
            const invalidClient = {
                name: "Acme Corp",
                email: "not-an-email",
            };
            const result = clientSchema.safeParse(invalidClient);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.flatten().fieldErrors.email).toBeDefined();
            }
        });

        it("should fail with short name", () => {
            const invalidClient = {
                name: "A",
                email: "contact@acme.com",
            };
            const result = clientSchema.safeParse(invalidClient);
            expect(result.success).toBe(false);
        });
    });

    describe("Activity Schema", () => {
        it("should validate a correct activity", () => {
            const validActivity = {
                type: ActivityType.MEETING,
                title: "Kickoff Meeting",
                startTime: new Date(),
                duration: 60,
            };
            const result = activitySchema.safeParse(validActivity);
            expect(result.success).toBe(true);
        });

        it("should fail validation if missing title", () => {
            const invalidActivity = {
                type: ActivityType.CALL,
                startTime: new Date(),
            };
            const result = activitySchema.safeParse(invalidActivity);
            expect(result.success).toBe(false);
        });
    });
});
