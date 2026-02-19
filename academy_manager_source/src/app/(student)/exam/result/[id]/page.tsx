import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Home } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export default async function ExamResultPage({ params }: { params: { id: string } }) {
    const submissionId = params.id;

    // Mock Data for Demo
    let result = {
        examTitle: "Weekly Reading Comprehension - Science",
        score: 80,
        totalQuestions: 5,
        correctCount: 4,
        submittedAt: new Date().toISOString(),
        feedback: "Great job! heavily reliant on understanding the passage details."
    };

    // Try fetching real data if ID is not mock
    if (submissionId !== "mock-submission-id" && submissionId !== "mock-id") {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("submissions")
            .select("score, feedback, submitted_at, exam:exams(title)")
            .eq("id", submissionId)
            .single();

        if (!error && data) {
            result = {
                examTitle: data.exam?.title || "Exam Result",
                score: data.score || 0,
                totalQuestions: 10, // simplified
                correctCount: Math.round((data.score || 0) / 10),
                submittedAt: data.submitted_at,
                feedback: data.feedback || "Completed."
            };
        }
    }

    const isPass = result.score >= 70;

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 bg-slate-50/50">
            <Card className="w-full max-w-md shadow-lg border-t-4 border-t-indigo-600">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto bg-indigo-50 p-3 rounded-full mb-4 w-fit">
                        {isPass ? <CheckCircle2 className="w-8 h-8 text-indigo-600" /> : <XCircle className="w-8 h-8 text-red-500" />}
                    </div>
                    <CardTitle className="text-2xl font-bold">
                        {isPass ? "Exam Completed!" : "Keep Practicing!"}
                    </CardTitle>
                    <p className="text-slate-500 text-sm mt-1">{result.examTitle}</p>
                </CardHeader>

                <CardContent className="space-y-6 pt-6">
                    <div className="text-center space-y-2">
                        <div className="text-5xl font-black text-slate-800 tracking-tight">
                            {result.score}
                            <span className="text-lg text-slate-400 font-medium ml-1">/ 100</span>
                        </div>
                        <div className="flex justify-center gap-1 text-sm font-medium">
                            <span className="text-green-600">{result.correctCount} Correct</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-red-500">{result.totalQuestions - result.correctCount} Incorrect</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-slate-500 uppercase font-semibold">
                            <span>Performance</span>
                            <span>{result.score}%</span>
                        </div>
                        <Progress value={result.score} className={`h-2 ${isPass ? 'bg-indigo-100' : 'bg-red-100'}`} />
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-600 italic text-center">
                        "{result.feedback}"
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-2 pt-2">
                    <Button className="w-full" size="lg" asChild>
                        <Link href="/my-mistakes">
                            Review Incorrect Answers <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                    <div className="grid grid-cols-2 w-full gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/my-learning">
                                <Home className="mr-2 w-4 h-4" /> Dashboard
                            </Link>
                        </Button>
                        <Button variant="ghost" className="text-slate-400" disabled>
                            <RotateCcw className="mr-2 w-4 h-4" /> Retry
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
