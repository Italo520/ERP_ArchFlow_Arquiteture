'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export async function updateStageOrder(projectId: string, updates: { id: string; order: number }[]) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    try {
        await prisma.$transaction(
            updates.map(u => prisma.stage.update({
                where: { id: u.id },
                data: { order: u.order }
            }))
        );
        revalidatePath(`/projects/${projectId}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to update stage order", error);
        throw new Error("Failed to update stage order");
    }
}

export async function updateStage(stageId: string, projectId: string, data: { name: string }) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    try {
        await prisma.stage.update({
            where: { id: stageId },
            data: { name: data.name }
        });
        revalidatePath(`/projects/${projectId}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to update stage", error);
        throw new Error("Failed to update stage");
    }
}
