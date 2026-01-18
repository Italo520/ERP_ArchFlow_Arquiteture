'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { z } from "zod"
import { revalidatePath } from "next/cache"

import { supabase } from "@/lib/supabase";

const ProjectSchema = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    clientName: z.string().nullable().optional(),
    imageUrl: z.string().nullable().optional(), // Will be populated after upload
    address: z.string().nullable().optional(),
    projectType: z.string().nullable().optional(),
    totalArea: z.coerce.number().nullable().optional(),
    startDate: z.string().nullable().optional(), // Receive as string from date picker
    deliveryDate: z.string().nullable().optional(),
})

export async function createProject(formData: FormData) {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        throw new Error("Não autorizado");
    }

    // Handle Image Upload
    let publicUrl = null;
    const imageFile = formData.get('imageFile') as File | null;

    if (imageFile && imageFile.size > 0) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${session.user.id}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('projects')
            .upload(filePath, imageFile);

        if (uploadError) {
            console.error('Upload Error:', uploadError);
            throw new Error('Erro ao fazer upload da imagem');
        }

        const { data: urlData } = supabase.storage
            .from('projects')
            .getPublicUrl(filePath);

        publicUrl = urlData.publicUrl;
    }

    const rawData = {
        name: formData.get('name'),
        clientName: formData.get('clientName'),
        imageUrl: publicUrl, // Use the uploaded URL or null
        address: formData.get('address'),
        projectType: formData.get('projectType'),
        totalArea: formData.get('totalArea'),
        startDate: formData.get('startDate'),
        deliveryDate: formData.get('deliveryDate'),
    }

    // Pass "imageUrl": null if undefined/null to Zod if needed, or handle optional
    if (!rawData.imageUrl && formData.get('imageUrl')) {
        // Fallback if user passed a URL string directly (future proofing)
        rawData.imageUrl = formData.get('imageUrl');
    }

    console.log("Raw Data for Validation:", rawData);

    const validatedFields = ProjectSchema.safeParse(rawData);

    if (!validatedFields.success) {
        console.error("Zod Validation Errors:", validatedFields.error.flatten());
        throw new Error("Dados inválidos");
    }

    const { name, clientName, imageUrl, address, projectType, totalArea, startDate, deliveryDate } = validatedFields.data;

    const project = await prisma.project.create({
        data: {
            name,
            clientName: clientName || null,
            imageUrl: imageUrl || null,
            address: address || null,
            projectType: projectType || null,
            totalArea: totalArea || null,
            startDate: startDate ? new Date(startDate) : null,
            deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
            status: "BS", // Briefing/Study
            ownerId: session.user.id,
        }
    });

    // Create default architecture stages
    const defaultStages = [
        "Estudo Preliminar",
        "Anteprojeto",
        "Projeto Legal",
        "Projeto Executivo",
        "Obras"
    ];

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
                        orderBy: { position: 'asc' },
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
