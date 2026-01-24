"use server";

import { prisma } from "@/lib/prisma";
import { clientSchema, updateClientSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function createClient(data: z.infer<typeof clientSchema>) {
    const result = clientSchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.flatten().fieldErrors };
    }

    try {
        const client = await prisma.client.create({
            data: result.data,
        });

        revalidatePath("/dashboard/clients");
        return { success: true, data: client };
    } catch (error: any) {
        console.error("Failed to create client:", error);
        return { error: "Failed to create client. " + (error.message || "") };
    }
}

export async function getClientById(id: string) {
    try {
        const client = await prisma.client.findUnique({
            where: { id },
            include: {
                projects: true,
                _count: {
                    select: { projects: true, activities: true },
                },
            },
        });
        return client;
    } catch (error) {
        console.error("Failed to get client:", error);
        return null;
    }
}

export async function updateClient(id: string, data: z.infer<typeof updateClientSchema>) {
    const result = updateClientSchema.safeParse({ ...data, id });

    if (!result.success) {
        return { error: result.error.flatten().fieldErrors };
    }

    try {
        const client = await prisma.client.update({
            where: { id },
            data: result.data,
        });

        revalidatePath("/dashboard/clients");
        revalidatePath(`/dashboard/clients/${id}`);
        return { success: true, data: client };
    } catch (error: any) {
        console.error("Failed to update client:", error);
        return { error: "Failed to update client." };
    }
}

export async function softDeleteClient(id: string) {
    try {
        await prisma.client.update({
            where: { id },
            data: {
                status: "INACTIVE", // Or BLOCKED, depending on logic
                deletedAt: new Date(),
            },
        });
        revalidatePath("/dashboard/clients");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete client:", error);
        return { error: "Failed to delete client." };
    }
}

export async function listClients(
    query?: string,
    page: number = 1,
    limit: number = 10
) {
    try {
        const skip = (page - 1) * limit;

        const where: any = {
            deletedAt: null,
        };

        if (query) {
            where.OR = [
                { name: { contains: query, mode: "insensitive" } },
                { email: { contains: query, mode: "insensitive" } },
                { document: { contains: query } },
            ];
        }

        const [clients, total] = await prisma.$transaction([
            prisma.client.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
            prisma.client.count({ where }),
        ]);

        return {
            data: clients,
            metadata: {
                total,
                page,
                totalPages: Math.ceil(total / limit),
            },
        };
    } catch (error) {
        console.error("Failed to list clients:", error);
        return { error: "Failed to list clients." };
    }
}
