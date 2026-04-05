import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { authConfig } from "./auth.config"

async function getUser(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    secret: process.env.AUTH_SECRET,
    ...authConfig,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("NextAuth Authorize attempt for:", credentials?.email);
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);
 
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const normalizedEmail = email.toLowerCase().trim();
                    const user = await getUser(normalizedEmail);
                    
                    if (!user) {
                        console.log("Auth Fail: User not found in DB:", normalizedEmail);
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
 
                    if (passwordsMatch) {
                        console.log("Auth Success: Password match for:", normalizedEmail);
                        return {
                            id: user.id,
                            name: user.fullName,
                            email: user.email,
                            role: user.role
                        };
                    } else {
                        console.log("Auth Fail: Password mismatch for:", normalizedEmail);
                    }
                } else {
                    console.error("Auth Fail: Invalid email/password format", parsedCredentials.error.format());
                }
 
                return null;
            },
        }),
    ],
})

