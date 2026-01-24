"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";

// Basic schema for project - we should ideally move this to lib/validations.ts
const projectSchema = z.object({
    name: z.string().min(2),
    status: z.string().default("PLANNING"),
    clientId: z.string().uuid().optional().nullable(),
    projectType: z.string().optional().nullable(),
    address: z.string().optional().nullable(),
    startDate: z.coerce.date().optional().nullable(),
    deliveryDate: z.coerce.date().optional().nullable(),
    totalArea: z.number().optional().nullable(),
});

export async function createProject(data: z.infer<typeof projectSchema>) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const result = projectSchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.flatten().fieldErrors };
    }

    try {
        const project = await prisma.project.create({
            data: {
                ...result.data,
                ownerId: session.user.id,
            },
        });

        revalidatePath("/dashboard/projects");
        if (data.clientId) revalidatePath(`/dashboard/clients/${data.clientId}`);
        return { success: true, data: project };
    } catch (error: any) {
        console.error("Failed to create project:", error);
        return { error: "Failed to create project." };
    }
}

export async function getProjectById(id: string) {
    try {
        const project = await prisma.project.findUnique({
            where: { id },
            include: {
                client: true,
                stages: {
                    include: { tasks: true }
                },
                _count: {
                    select: { tasks: true, deliverables: true, timeLogs: true },
                },
            },
        });
        return project;
    } catch (error) {
        console.error("Failed to get project:", error);
        return null;
    }
}

export async function updateProject(id: string, data: Partial<z.infer<typeof projectSchema>>) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    try {
        const project = await prisma.project.update({
            where: { id },
            data: data,
        });

        revalidatePath("/dashboard/projects");
        revalidatePath(`/dashboard/projects/${id}`);
        return { success: true, data: project };
    } catch (error) {
        console.error("Failed to update project:", error);
        return { error: "Failed to update project." };
    }
}

export async function deleteProject(id: string) {
    const session = await auth();
    // TODO: Add permission check for DELETE
    if (!session?.user?.id) return { error: "Unauthorized" };

    try {
        // Soft delete if per policy, assuming schema supports it (it does: deletedAt)
        await prisma.project.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
        revalidatePath("/dashboard/projects");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete project:", error);
        return { error: "Failed to delete project." };
    }
}

export async function listProjects(filters?: { clientId?: string; status?: string }) {
    try {
        const where: any = { deletedAt: null };
        if (filters?.clientId) where.clientId = filters.clientId;
        if (filters?.status) where.status = filters.status;

        const projects = await prisma.project.findMany({
            where,
            orderBy: { updatedAt: "desc" },
            include: {
                client: { select: { name: true } },
                owner: { select: { fullName: true } },
            }
        });
        return { data: projects };
    } catch (error) {
        console.error("Failed to list projects:", error);
        return { error: "Failed to list projects." };
    }
}
