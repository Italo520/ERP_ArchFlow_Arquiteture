"use server";

import { signIn as nextAuthSignIn, signOut as nextAuthSignOut, auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

const signUpSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

const updateProfileSchema = z.object({
    fullName: z.string().min(2).optional(),
    email: z.string().email().optional(),
    // Add other profile fields as needed
});

export async function signIn(provider: string, options?: any) {
    return await nextAuthSignIn(provider, options);
}

export async function signOut() {
    return await nextAuthSignOut();
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        await nextAuthSignIn("credentials", formData);
    } catch (error) {
        if ((error as Error).message.includes("CredentialsSignin")) {
            return "CredentialSignin";
        }
        throw error;
    }
}

export async function signUp(data: z.infer<typeof signUpSchema>) {
    const result = signUpSchema.safeParse(data);
    if (!result.success) {
        return { error: result.error.flatten().fieldErrors };
    }

    const { email, password, name } = result.data;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { error: "User already exists" };
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                email,
                fullName: name,
                passwordHash,
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Failed to sign up:", error);
        return { error: "Failed to create account." };
    }
}

export async function getCurrentUser() {
    const session = await auth();
    return session?.user;
}

export async function updateProfile(data: z.infer<typeof updateProfileSchema>) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const result = updateProfileSchema.safeParse(data);
    if (!result.success) return { error: result.error.flatten().fieldErrors };

    try {
        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: result.data,
        });

        revalidatePath("/profile");
        return { success: true, data: updatedUser };
    } catch (error) {
        console.error("Update profile failed:", error);
        return { error: "Failed to update profile" };
    }
}
