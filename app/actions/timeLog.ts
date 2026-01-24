"use server";

import { prisma } from "@/lib/prisma";
import { timeLogSchema, updateTimeLogSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";

export async function createTimeLog(data: z.infer<typeof timeLogSchema>) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const result = timeLogSchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.flatten().fieldErrors };
    }

    try {
        const timeLog = await prisma.timeLog.create({
            data: {
                ...result.data,
                userId: session.user.id,
            },
        });

        revalidatePath("/dashboard/time-tracking");
        return { success: true, data: timeLog };
    } catch (error: any) {
        console.error("Failed to create time log:", error);
        return { error: "Failed to create time log." };
    }
}

export async function getTimeLogById(id: string) {
    try {
        const timeLog = await prisma.timeLog.findUnique({
            where: { id },
        });
        return timeLog;
    } catch (error) {
        console.error("Failed to get time log:", error);
        return null;
    }
}

export async function updateTimeLog(id: string, data: z.infer<typeof updateTimeLogSchema>) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const result = updateTimeLogSchema.safeParse({ ...data, id });

    if (!result.success) {
        return { error: result.error.flatten().fieldErrors };
    }

    try {
        const timeLog = await prisma.timeLog.update({
            where: { id },
            data: result.data,
        });

        revalidatePath("/dashboard/time-tracking");
        return { success: true, data: timeLog };
    } catch (error: any) {
        console.error("Failed to update time log:", error);
        return { error: "Failed to update time log." };
    }
}

export async function deleteTimeLog(id: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    try {
        await prisma.timeLog.delete({
            where: { id },
        });
        revalidatePath("/dashboard/time-tracking");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete time log:", error);
        return { error: "Failed to delete time log." };
    }
}

export async function listTimeLogs(
    page: number = 1,
    limit: number = 20,
    filters?: { projectId?: string; clientId?: string }
) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    try {
        const skip = (page - 1) * limit;
        const where: any = { userId: session.user.id }; // Usually tracking own time

        if (filters?.projectId) where.projectId = filters.projectId;
        if (filters?.clientId) where.clientId = filters.clientId;

        const [logs, total] = await prisma.$transaction([
            prisma.timeLog.findMany({
                where,
                skip,
                take: limit,
                orderBy: { date: "desc" },
                include: {
                    project: { select: { name: true } },
                    client: { select: { name: true } },
                },
            }),
            prisma.timeLog.count({ where }),
        ]);

        return {
            data: logs,
            metadata: { total, page, totalPages: Math.ceil(total / limit) },
        };
    } catch (error) {
        console.error("Failed to list time logs:", error);
        return { error: "Failed to list time logs." };
    }
}
