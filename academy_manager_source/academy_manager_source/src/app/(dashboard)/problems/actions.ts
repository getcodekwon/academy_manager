"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export type Problem = {
    id: string;
    content: string;
    type: string;
    difficulty: string;
    status: "draft" | "pending_review" | "published" | "archived";
    created_at: string;
    review_note?: string;
    reviewed_by?: string;
};

export async function getDraftProblems() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("problems")
        .select("*")
        .eq("status", "draft")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching draft problems:", error);
        throw new Error("Failed to fetch draft problems");
    }

    return data as Problem[];
}

export async function publishProblem(problemId: string, reviewNote?: string) {
    const supabase = await createClient();

    // Get current user (Reviewer)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { error } = await supabase
        .from("problems")
        .update({
            status: "published",
            reviewed_by: user.id,
            review_note: reviewNote,
            published_at: new Date().toISOString(),
        })
        .eq("id", problemId);

    if (error) {
        console.error("Error publishing problem:", error);
        throw new Error("Failed to publish problem");
    }

    revalidatePath("/problems/review");
    revalidatePath("/library"); // Update main library view too
}

export async function rejectProblem(problemId: string, reviewNote: string) {
    const supabase = await createClient();
    // Get current user (Reviewer)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { error } = await supabase
        .from("problems")
        .update({
            status: "archived", // Or stay in draft but flagged? Let's use archived for now or maybe a 'rejected' status if we add it. 
            // For now, let's keep it simple: Archive it if it's bad, or we could add a 'revision_needed' status later.
            reviewed_by: user.id,
            review_note: reviewNote,
        })
        .eq("id", problemId);

    if (error) {
        console.error("Error rejecting problem:", error);
        throw new Error("Failed to reject problem");
    }

    revalidatePath("/problems/review");
}
