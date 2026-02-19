"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ExamData = {
    id: string;
    title: string;
    deadline: string | null;
    problems: {
        id: string;
        question_text: string;
        options: any;
        type: string;
        passage?: {
            title: string;
            content: string;
        };
    }[];
};

export async function getExam(examId: string) {
    const supabase = await createClient();

    // 1. Fetch Exam Metadata
    const { data: exam, error: examError } = await supabase
        .from("exams")
        .select("*")
        .eq("id", examId)
        .single();

    if (examError || !exam) throw new Error("Exam not found");

    // 2. Fetch Problems (and Passages)
    // In a real app, we'd query by the array of IDs in exam.problem_ids
    // For this MVP, let's just fetch all problems linked to this exam (if we had a join table) 
    // OR fetch problems where their ID is in the list.

    if (!exam.problem_ids || exam.problem_ids.length === 0) {
        return { ...exam, problems: [] } as ExamData;
    }

    const { data: problems, error: problemsError } = await supabase
        .from("problems")
        .select(`
      id,
      question_text,
      options,
      type,
      passage:passages(title, content)
    `)
        .in("id", exam.problem_ids);

    if (problemsError) throw new Error("Failed to load problems");

    return {
        ...exam,
        problems: problems
    } as ExamData;
}

export async function createSubmission(examId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    // Check if already submitted? (Optional)

    const { data, error } = await supabase
        .from("submissions")
        .insert({
            exam_id: examId,
            student_id: user.id,
            score: 0, // Pending
            submitted_at: new Date().toISOString() // Or separate started_at vs submitted_at
        })
        .select()
        .single();

    if (error) throw new Error("Failed to start exam");
    return data.id;
}

export async function submitExamAnswers(submissionId: string, answers: { problem_id: string; answer: string }[]) {
    const supabase = await createClient();

    // 1. Fetch Problems to check correct answers (Auto-Grading)
    const problemIds = answers.map(a => a.problem_id);
    const { data: problems } = await supabase
        .from("problems")
        .select("id, correct_answer, explanation")
        .in("id", problemIds);

    if (!problems) throw new Error("Problems not found for grading");

    const problemMap = new Map(problems.map(p => [p.id, p]));

    let correctCount = 0;
    const details = answers.map(ans => {
        const problem = problemMap.get(ans.problem_id);
        const isCorrect = problem ? problem.correct_answer === ans.answer : false;
        if (isCorrect) correctCount++;

        return {
            submission_id: submissionId,
            problem_id: ans.problem_id,
            student_answer: ans.answer,
            is_correct: isCorrect,
            ai_feedback: problem?.explanation || "Auto-graded."
        };
    });

    // 2. Save Details
    const { error: detailsError } = await supabase
        .from("submission_details")
        .insert(details);

    if (detailsError) throw new Error("Failed to save answers");

    // 3. Update Submission Score
    const total = answers.length;
    const score = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    const { error: scoreError } = await supabase
        .from("submissions")
        .update({ score, feedback: `You got ${correctCount} out of ${total} correct.` })
        .eq("id", submissionId);

    if (scoreError) throw new Error("Failed to update score");

    revalidatePath("/my-learning");
    revalidatePath("/analytics");
}
