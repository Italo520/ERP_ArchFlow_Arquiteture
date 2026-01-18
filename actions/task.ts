'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { Priority } from "@prisma/client"

const TaskSchema = z.object({
    title: z.string().min(1, "Título obrigatório"),
    description: z.string().optional(),
    priority: z.nativeEnum(Priority).optional(),
    dueDate: z.string().optional().transform(str => str ? new Date(str) : null),
    projectId: z.string(),
    stageId: z.string(),
    assigneeId: z.string().optional().nullable(),
    tags: z.array(z.string()).optional(),
})

// Types for JSONB fields
interface HistoryItem {
    date: string;
    userId: string;
    userName: string;
    type: string;
    details: string;
}

export async function createTask(data: z.infer<typeof TaskSchema>) {
    const session = await auth();
    const user = session?.user;

    const validated = TaskSchema.safeParse(data);
    if (!validated.success) throw new Error("Dados inválidos");

    const { title, description, priority, dueDate, projectId, stageId, assigneeId, tags } = validated.data;

    const history: HistoryItem[] = [];
    if (user && user.id) {
        history.push({
            date: new Date().toISOString(),
            userId: user.id,
            userName: user.name || user.email || "Unknown",
            type: "CREATED",
            details: "Tarefa criada"
        });
    }

    const task = await prisma.task.create({
        data: {
            title,
            description,
            priority: priority || "MEDIUM",
            dueDate,
            projectId,
            stageId,
            assigneeId: assigneeId || null,
            tags: tags || [],
            historico: history as any, // Prisma Json handling
            checklist: [],
            attachments: [],
            comments: []
        }
    });

    revalidatePath(`/projects/${projectId}`);
    return { success: true, task };
}

export async function updateTaskStage(taskId: string, newStageId: string, projectId: string) {
    const session = await auth();
    const user = session?.user;

    const stage = await prisma.stage.findUnique({ where: { id: newStageId } });
    if (!stage) throw new Error("Stage not found");

    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) throw new Error("Task not found");

    // History
    let currentHistory = (task.historico as unknown as HistoryItem[]) || [];
    if (user && user.id) {
        currentHistory.push({
            date: new Date().toISOString(),
            userId: user.id,
            userName: user.name || user.email || "Unknown",
            type: "STATUS_CHANGED",
            details: `Status alterado para ${stage.name}`
        });
    }

    await prisma.task.update({
        where: { id: taskId },
        data: {
            stageId: newStageId,
            historico: currentHistory as any
        }
    });

    revalidatePath(`/projects/${projectId}`); // Revalidate project board
    return { success: true };
}

export async function updateTask(taskId: string, projectId: string, data: Partial<z.infer<typeof TaskSchema>>) {
    const session = await auth();
    const user = session?.user;

    // In a real generic update, we'd compare fields to generate history
    // Simplified for now to just update

    await prisma.task.update({
        where: { id: taskId },
        data: {
            ...data,
            dueDate: data.dueDate ? new Date(data.dueDate) : undefined
        }
    });

    revalidatePath(`/projects/${projectId}`);
    return { success: true };
}

export async function deleteTask(taskId: string, projectId: string) {
    await prisma.task.delete({ where: { id: taskId } });
    revalidatePath(`/projects/${projectId}`);
    return { success: true };
}

export async function updateTaskPositions(projectId: string, updates: { id: string; position: number; stageId: string }[]) {
    try {
        await prisma.$transaction(
            updates.map(u => prisma.task.update({
                where: { id: u.id },
                data: { position: u.position, stageId: u.stageId }
            }))
        );
        revalidatePath(`/projects/${projectId}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to update task positions", error);
        throw new Error("Failed to update task positions");
    }
}
