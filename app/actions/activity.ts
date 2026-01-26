"use server";

import { prisma } from "@/lib/prisma";
import { activitySchema, updateActivitySchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { ActivityStatus } from "@prisma/client";

// Helper for standarized return
type ActionResponse<T = any> = {
    success: boolean;
    data?: T;
    error?: string;
};

export async function createActivity(data: z.infer<typeof activitySchema>): Promise<ActionResponse> {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    const result = activitySchema.safeParse(data);

    if (!result.success) {
        return { success: false, error: JSON.stringify(result.error.flatten().fieldErrors) };
    }

    try {
        const activity = await prisma.activity.create({
            data: {
                ...result.data,
                createdById: session.user.id,
            },
        });

        revalidatePath("/dashboard/activities");
        if (data.clientId) revalidatePath(`/dashboard/clients/${data.clientId}`);
        return { success: true, data: activity };
    } catch (error: any) {
        console.error("Failed to create activity:", error);
        return { success: false, error: "Failed to create activity." };
    }
}

export async function getActivityById(id: string): Promise<ActionResponse> {
    try {
        const activity = await prisma.activity.findUnique({
            where: { id },
            include: {
                client: true,
                project: true,
                createdBy: { select: { id: true, fullName: true, email: true } },
            },
        });
        if (!activity) return { success: false, error: "Activity not found" };
        return { success: true, data: activity };
    } catch (error) {
        console.error("Failed to get activity:", error);
        return { success: false, error: "Failed to get activity." };
    }
}

export async function updateActivity(id: string, data: z.infer<typeof updateActivitySchema>): Promise<ActionResponse> {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    const result = updateActivitySchema.safeParse({ ...data, id });

    if (!result.success) {
        return { success: false, error: JSON.stringify(result.error.flatten().fieldErrors) };
    }

    try {
        const activity = await prisma.activity.update({
            where: { id },
            data: result.data,
        });

        revalidatePath("/dashboard/activities");
        return { success: true, data: activity };
    } catch (error: any) {
        console.error("Failed to update activity:", error);
        return { success: false, error: "Failed to update activity." };
    }
}

export async function deleteActivity(id: string): Promise<ActionResponse> {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    try {
        await prisma.activity.delete({
            where: { id },
        });
        revalidatePath("/dashboard/activities");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete activity:", error);
        return { success: false, error: "Failed to delete activity." };
    }
}

export async function completeActivity(id: string): Promise<ActionResponse> {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    try {
        const activity = await prisma.activity.update({
            where: { id },
            data: { status: ActivityStatus.COMPLETED },
        });
        revalidatePath("/dashboard/activities");
        return { success: true, data: activity };
    } catch (error) {
        console.error("Failed to complete activity:", error);
        return { success: false, error: "Failed to complete activity." };
    }
}

export async function addParticipant(id: string, participantName: string): Promise<ActionResponse> {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    try {
        const activity = await prisma.activity.findUnique({ where: { id }, select: { participants: true } });
        if (!activity) return { success: false, error: "Activity not found" };

        const updatedParticipants = [...(activity.participants || []), participantName];

        // Remove duplicates just in case
        const uniqueParticipants = Array.from(new Set(updatedParticipants));

        const updatedActivity = await prisma.activity.update({
            where: { id },
            data: { participants: uniqueParticipants },
        });

        revalidatePath("/dashboard/activities");
        return { success: true, data: updatedActivity };
    } catch (error) {
        console.error("Failed to add participant:", error);
        return { success: false, error: "Failed to add participant." };
    }
}

export async function removeParticipant(id: string, participantName: string): Promise<ActionResponse> {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    try {
        const activity = await prisma.activity.findUnique({ where: { id }, select: { participants: true } });
        if (!activity) return { success: false, error: "Activity not found" };

        const updatedParticipants = (activity.participants || []).filter(p => p !== participantName);

        const updatedActivity = await prisma.activity.update({
            where: { id },
            data: { participants: updatedParticipants },
        });

        revalidatePath("/dashboard/activities");
        return { success: true, data: updatedActivity };
    } catch (error) {
        console.error("Failed to remove participant:", error);
        return { success: false, error: "Failed to remove participant." };
    }
}

export async function listActivities(
    filters?: { clientId?: string; projectId?: string; type?: string; date?: string },
    page: number = 1,
    limit: number = 20
): Promise<ActionResponse> {
    try {
        const skip = (page - 1) * limit;

        const where: any = {};
        if (filters?.clientId) where.clientId = filters.clientId;
        if (filters?.projectId) where.projectId = filters.projectId;
        if (filters?.type) where.type = filters.type;
        if (filters?.date) {
            const date = new Date(filters.date);
            const nextDate = new Date(date);
            nextDate.setDate(date.getDate() + 1);
            where.startTime = {
                gte: date,
                lt: nextDate,
            };
        }

        const [activities, total] = await prisma.$transaction([
            prisma.activity.findMany({
                where,
                skip,
                take: limit,
                orderBy: { startTime: "desc" },
                include: {
                    client: { select: { id: true, name: true } },
                    project: { select: { id: true, name: true } },
                    createdBy: { select: { fullName: true } },
                },
            }),
            prisma.activity.count({ where }),
        ]);

        return {
            success: true,
            data: activities,
            // metadata: { total, page, totalPages: Math.ceil(total / limit) } - user requested specific standardized return, sticking to data: any. 
            // I'll attach metadata to data if needed or just return it as data.
            // The user asked for { success, data, error }. I will wrap the list result in data.
        };
    } catch (error) {
        console.error("Failed to list activities:", error);
        return { success: false, error: "Failed to list activities." };
    }
}
