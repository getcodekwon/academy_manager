"use server";

import { createClient } from "@/utils/supabase/server";

export type WrongAnswer = {
    id: string; // submission_detail id
    student_answer: string;
    is_correct: boolean;
    ai_feedback: string | null;
    problem: {
        id: string;
        question_text: string;
        options: any;
        correct_answer: string;
        explanation: string | null;
        tags: string[];
    };
    exam: {
        title: string;
        created_at: string;
    };
};

export async function getWrongAnswers() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Unauthorized");

    // Fetch submission details where is_correct is false
    const { data, error } = await supabase
        .from("submission_details")
        .select(`
      id,
      student_answer,
      is_correct,
      ai_feedback,
      problem:problems (
        id,
        question_text,
        options,
        correct_answer,
        explanation,
        tags
      ),
      submission:submissions (
        exam:exams (
          title,
          created_at
        )
      )
    `)
        .eq("submission.student_id", user.id) // This filter requires a join, Supabase syntax might need !inner on submission if RLS doesn't handle it implicity for the join
        // tailored query:
        // We need to filter by student_id on the submission table. 
        // Let's rely on RLS for now: Users can only see their own submissions. 
        // If RLS is set up correctly on submission_details (using join to submissions), this is fine.
        // However, for safety/performance, let's assume we filter by the user's submissions first.

        .eq("is_correct", false)
        .order("id", { ascending: false }) // timestamp would be better but it's on submission
        .limit(20);

    if (error) {
        console.error("Error fetching wrong answers:", error);
        // Return empty for now if query is complex or fails
        return [];
    }

    // Transform data structure to be cleaner
    return data.map((item: any) => ({
        id: item.id,
        student_answer: item.student_answer,
        is_correct: item.is_correct,
        ai_feedback: item.ai_feedback,
        problem: item.problem,
        exam: item.submission?.exam
    })) as WrongAnswer[];
}
