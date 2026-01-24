"use server";

import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "@/auth";

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
