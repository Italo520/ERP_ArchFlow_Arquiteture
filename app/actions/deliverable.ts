"use server";

import { prisma } from "@/lib/prisma";
import { deliverableSchema, updateDeliverableSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";

export async function createDeliverable(data: z.infer<typeof deliverableSchema>) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const result = deliverableSchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.flatten().fieldErrors };
    }

    try {
        const deliverable = await prisma.deliverable.create({
            data: {
                ...result.data,
                createdById: session.user.id,
            },
        });

        revalidatePath(`/dashboard/projects/${data.projectId}`);
        return { success: true, data: deliverable };
    } catch (error: any) {
        console.error("Failed to create deliverable:", error);
        return { error: "Failed to create deliverable." };
    }
}

export async function getDeliverableById(id: string) {
    try {
        const deliverable = await prisma.deliverable.findUnique({
            where: { id },
            include: {
                createdBy: { select: { fullName: true } },
                approvedBy: { select: { fullName: true } },
            },
        });
        return deliverable;
    } catch (error) {
        console.error("Failed to get deliverable:", error);
        return null;
    }
}

export async function updateDeliverable(id: string, data: z.infer<typeof updateDeliverableSchema>) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const result = updateDeliverableSchema.safeParse({ ...data, id });

    if (!result.success) {
        return { error: result.error.flatten().fieldErrors };
    }

    try {
        const deliverable = await prisma.deliverable.update({
            where: { id },
            data: result.data,
        });

        revalidatePath(`/dashboard/projects/${deliverable.projectId}`);
        return { success: true, data: deliverable };
    } catch (error: any) {
        console.error("Failed to update deliverable:", error);
        return { error: "Failed to update deliverable." };
    }
}

export async function deleteDeliverable(id: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    try {
        const deliverable = await prisma.deliverable.delete({
            where: { id },
        });
        revalidatePath(`/dashboard/projects/${deliverable.projectId}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to delete deliverable:", error);
        return { error: "Failed to delete deliverable." };
    }
}

export async function listDeliverables(projectId: string) {
    try {
        const deliverables = await prisma.deliverable.findMany({
            where: { projectId, deletedAt: null },
            orderBy: { createdAt: "desc" },
            include: {
                createdBy: { select: { fullName: true } },
            },
        });
        return { data: deliverables };
    } catch (error) {
        console.error("Failed to list deliverables:", error);
        return { error: "Failed to list deliverables." };
    }
}
