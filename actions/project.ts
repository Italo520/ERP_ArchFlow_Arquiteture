'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { z } from "zod"
import { revalidatePath } from "next/cache"

const ProjectSchema = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    clientName: z.string().optional(),
    imageUrl: z.string().optional(),
})

export async function createProject(formData: FormData) {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        throw new Error("Não autorizado");
    }

    const rawData = {
        name: formData.get('name'),
        clientName: formData.get('clientName'),
        imageUrl: formData.get('imageUrl'),
    }

    const validatedFields = ProjectSchema.safeParse(rawData);

    if (!validatedFields.success) {
        throw new Error("Dados inválidos");
    }

    const { name, clientName, imageUrl } = validatedFields.data;

    const project = await prisma.project.create({
        data: {
            name,
            clientName: clientName || null,
            imageUrl: imageUrl || null,
            status: "TO_DO",
            ownerId: session.user.id,
        }
    });

    // Create default stages
    const defaultStages = ["To Do", "In Progress", "Done"];
    await prisma.stage.createMany({
        data: defaultStages.map((stageName, index) => ({
            name: stageName,
            order: index,
            projectId: project.id
        }))
    });

    revalidatePath('/dashboard');
    return { success: true, projectId: project.id };
}

export async function getUserProjects() {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return [];
    }

    return await prisma.project.findMany({
        where: { ownerId: session.user.id },
        orderBy: { createdAt: 'desc' }
    });
}

export async function getProjectById(projectId: string) {
    const session = await auth();
    if (!session || !session.user) return null;

    const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: {
            stages: {
                orderBy: { order: 'asc' },
                include: {
                    tasks: {
                        include: {
                            assignee: { select: { id: true, fullName: true, email: true } }
                        }
                    }
                }
            },
            owner: { select: { id: true, fullName: true } }
        }
    });

    return project;
}

export async function deleteProject(projectId: string) {
    const session = await auth();
    if (!session || !session.user) throw new Error("Não autorizado");

    await prisma.project.delete({
        where: { id: projectId }
        // Cascade delete handles stages and tasks
    });

    revalidatePath('/dashboard');
    return { success: true };
}
