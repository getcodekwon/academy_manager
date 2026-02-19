"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function login(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error("Login error:", error.message);
        return redirect(`/login?error=${encodeURIComponent(error.message)}`);
    }

    // Check user role to redirect appropriately (future enhancement)
    // For now, default to dashboard
    return redirect("/dashboard");
}

export async function signup(formData: FormData) {
    const origin = (await headers()).get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("full_name") as string;
    const role = formData.get("role") as string || "student";

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
            data: {
                full_name: fullName,
                role: role,
            },
        },
    });

    if (error) {
        console.error("Signup error:", error);
        return redirect("/login?error=Could not create account. Try again.");
    }

    if (data.session) {
        return redirect("/dashboard");
    }

    return redirect("/login?success=Check your email to continue the sign-in process");
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect("/login");
}
