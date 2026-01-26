"use server";

import { prisma } from "@/lib/prisma";
import { timeLogSchema, updateTimeLogSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { TimeLogCategory } from "@prisma/client";

type ActionResponse<T = any> = {
    success: boolean;
    data?: T;
    error?: string;
};

// Schema for starting a timer - excludes duration requirement as it starts at 0
const startTimeLogSchema = z.object({
    projectId: z.string().uuid(),
    taskId: z.string().uuid().optional().nullable(),
    clientId: z.string().uuid().optional().nullable(),
    category: z.nativeEnum(TimeLogCategory),
    description: z.string().optional(),
    billable: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
});

export async function createTimeLog(data: z.infer<typeof timeLogSchema>): Promise<ActionResponse> {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    const result = timeLogSchema.safeParse(data);

    if (!result.success) {
        return { success: false, error: JSON.stringify(result.error.flatten().fieldErrors) };
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
        return { success: false, error: "Failed to create time log." };
    }
}

export async function startTimeLog(data: z.infer<typeof startTimeLogSchema>): Promise<ActionResponse> {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    const result = startTimeLogSchema.safeParse(data);
    if (!result.success) {
        return { success: false, error: JSON.stringify(result.error.flatten().fieldErrors) };
    }

    try {
        const timeLog = await prisma.timeLog.create({
            data: {
                ...result.data,
                userId: session.user.id,
                date: new Date(),
                startTime: new Date(),
                duration: 0, // Initial duration is 0
            },
        });
        revalidatePath("/dashboard/time-tracking");
        return { success: true, data: timeLog };
    } catch (error) {
        console.error("Failed to start time log:", error);
        return { success: false, error: "Failed to start time log." };
    }
}

export async function stopTimeLog(id: string): Promise<ActionResponse> {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    try {
        const log = await prisma.timeLog.findUnique({ where: { id } });
        if (!log) return { success: false, error: "Time log not found" };
        if (log.endTime) return { success: false, error: "Timer already stopped" };
        if (!log.startTime) return { success: false, error: "No start time set for this log" };

        const endTime = new Date();
        const startTime = new Date(log.startTime);
        const durationMs = endTime.getTime() - startTime.getTime();
        const durationHours = durationMs / (1000 * 60 * 60);

        const updatedLog = await prisma.timeLog.update({
            where: { id },
            data: {
                endTime,
                duration: durationHours,
            },
        });

        revalidatePath("/dashboard/time-tracking");
        return { success: true, data: updatedLog };
    } catch (error) {
        console.error("Failed to stop time log:", error);
        return { success: false, error: "Failed to stop time log." };
    }
}

export async function getTimeLogById(id: string): Promise<ActionResponse> {
    try {
        const timeLog = await prisma.timeLog.findUnique({
            where: { id },
        });
        if (!timeLog) return { success: false, error: "Time log not found" };
        return { success: true, data: timeLog };
    } catch (error) {
        console.error("Failed to get time log:", error);
        return { success: false, error: "Failed to get time log." };
    }
}

export async function updateTimeLog(id: string, data: z.infer<typeof updateTimeLogSchema>): Promise<ActionResponse> {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    const result = updateTimeLogSchema.safeParse({ ...data, id });

    if (!result.success) {
        return { success: false, error: JSON.stringify(result.error.flatten().fieldErrors) };
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
        return { success: false, error: "Failed to update time log." };
    }
}

export async function deleteTimeLog(id: string): Promise<ActionResponse> {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    try {
        await prisma.timeLog.delete({
            where: { id },
        });
        revalidatePath("/dashboard/time-tracking");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete time log:", error);
        return { success: false, error: "Failed to delete time log." };
    }
}

export async function listTimeLogs(
    page: number = 1,
    limit: number = 20,
    filters?: { projectId?: string; clientId?: string; startDate?: string; endDate?: string }
): Promise<ActionResponse> {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    try {
        const skip = (page - 1) * limit;
        const where: any = { userId: session.user.id };

        if (filters?.projectId) where.projectId = filters.projectId;
        if (filters?.clientId) where.clientId = filters.clientId;
        if (filters?.startDate && filters?.endDate) {
            where.date = {
                gte: new Date(filters.startDate),
                lte: new Date(filters.endDate),
            };
        }

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
            success: true,
            data: {
                logs,
                metadata: { total, page, totalPages: Math.ceil(total / limit) },
            }
        };
    } catch (error) {
        console.error("Failed to list time logs:", error);
        return { success: false, error: "Failed to list time logs." };
    }
}

export async function calculateBillableHours(projectId: string): Promise<ActionResponse> {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    try {
        const aggregation = await prisma.timeLog.aggregate({
            _sum: {
                duration: true,
            },
            where: {
                projectId,
                billable: true,
            },
        });

        return { success: true, data: { totalBillableHours: aggregation._sum.duration || 0 } };
    } catch (error) {
        console.error("Failed to calculate billable hours:", error);
        return { success: false, error: "Failed to calculate billable hours." };
    }
}

export async function getRunningTimeLog(): Promise<ActionResponse> {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    try {
        const timeLog = await prisma.timeLog.findFirst({
            where: {
                userId: session.user.id,
                endTime: null,
            },
            include: {
                project: { select: { name: true, id: true } },
                client: { select: { name: true, id: true } },
            },
        });

        if (!timeLog) return { success: true, data: null };
        return { success: true, data: timeLog };
    } catch (error) {
        console.error("Failed to get running time log:", error);
        return { success: false, error: "Failed to get running time log." };
    }
}
