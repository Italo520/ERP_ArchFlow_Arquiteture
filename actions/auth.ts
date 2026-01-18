'use server'

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const RegisterSchema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
})

export async function register(prevState: any, formData: FormData) {
    // We can also accept plain objects if called from client components directly without form action
    // But let's support direct calling for now to match current React state pattern in page.jsx

    // If arguments are passed directly (not formData):
    // adaptable based on usage. 
}

// Cleaner implementation for direct call from Client Component (like legacy service)
export async function registerUser(data: z.infer<typeof RegisterSchema>) {
    try {
        const validatedFields = RegisterSchema.safeParse(data);

        if (!validatedFields.success) {
            console.error("Validation failed:", validatedFields.error.flatten());
            throw new Error(`Dados inválidos: ${validatedFields.error.errors.map(e => e.message).join(', ')}`);
        }

        const { email, password, fullName } = validatedFields.data;
        const normalizedEmail = email.toLowerCase();

        const existingUser = await prisma.user.findUnique({
            where: { email: normalizedEmail }
        });

        if (existingUser) {
            throw new Error('Este email já está em uso.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                email: normalizedEmail,
                passwordHash: hashedPassword,
                fullName,
            },
        });

        return { success: true };
    } catch (error: any) {
        console.error("REGISTRATION_ERROR:", error);
        throw new Error(error.message || "Erro ao registrar usuário");
    }
}
