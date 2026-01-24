"use server";

import { prisma } from "@/lib/prisma";
import { activitySchema, updateActivitySchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";

export async function createActivity(data: z.infer<typeof activitySchema>) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const result = activitySchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.flatten().fieldErrors };
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
        return { error: "Failed to create activity." };
    }
}

export async function getActivityById(id: string) {
    try {
        const activity = await prisma.activity.findUnique({
            where: { id },
            include: {
                client: true,
                project: true,
                createdBy: { select: { id: true, fullName: true, email: true } },
            },
        });
        return activity;
    } catch (error) {
        console.error("Failed to get activity:", error);
        return null;
    }
}

export async function updateActivity(id: string, data: z.infer<typeof updateActivitySchema>) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const result = updateActivitySchema.safeParse({ ...data, id });

    if (!result.success) {
        return { error: result.error.flatten().fieldErrors };
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
        return { error: "Failed to update activity." };
    }
}

export async function deleteActivity(id: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    try {
        await prisma.activity.delete({
            where: { id },
        });
        revalidatePath("/dashboard/activities");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete activity:", error);
        return { error: "Failed to delete activity." };
    }
}

export async function listActivities(
    filters?: { clientId?: string; projectId?: string; type?: string },
    page: number = 1,
    limit: number = 20
) {
    try {
        const skip = (page - 1) * limit;

        const where: any = {};
        if (filters?.clientId) where.clientId = filters.clientId;
        if (filters?.projectId) where.projectId = filters.projectId;
        if (filters?.type) where.type = filters.type;

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
            data: activities,
            metadata: { total, page, totalPages: Math.ceil(total / limit) },
        };
    } catch (error) {
        console.error("Failed to list activities:", error);
        return { error: "Failed to list activities." };
    }
}
