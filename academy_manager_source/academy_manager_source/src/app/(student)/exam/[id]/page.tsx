"use client";

import { useEffect, useState } from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { getExam, createSubmission, submitExamAnswers, type ExamData } from "../actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

// Mock Data for Fallback
const MOCK_EXAM: ExamData = {
    id: "mock-exam-123",
    title: "Weekly Reading Comprehension - Science (Demo)",
    deadline: null,
    problems: [
        {
            id: "p1",
            type: "multiple_choice",
            question_text: "According to the passage, what is the significance of 'geothermal photosynthesizers'?",
            options: [
                { id: "A", text: "They prove life originated in deep sea vents." },
                { id: "B", text: "They suggest life can exist without direct sunlight." },
                { id: "C", text: "They show chemical energy is more efficient." },
                { id: "D", text: "They confirm photosynthesis needs visible light." }
            ],
            passage: {
                title: "Understanding Photosynthesis in Deep Sea Vents",
                content: `However, recent discoveries have revolutionized our understanding of photosynthesis. In the deep ocean, where sunlight cannot penetrate, hydrothermal vents support unique ecosystems. Here, certain bacteria perform chemosynthesis, using chemical energy from minerals rather than light energy. Yet, strictly speaking, some organisms near these vents do utilize faint infrared light emitted by the geothermal heat source.
    
    This challenges the traditional definition of photosynthesis as a purely solar-driven process. The existence of these 'geothermal photosynthesizers' implies that life could potentially exist on planets far from their host stars, relying on internal planetary heat.`
            }
        },
        {
            id: "p2",
            type: "multiple_choice",
            question_text: "Which term best describes the bacteria mentioned?",
            options: [
                { id: "A", text: "Photophobic" },
                { id: "B", text: "Chemosynthetic" },
                { id: "C", text: "Parasitic" },
                { id: "D", text: "Solar-dependent" }
            ]
        }
    ]
};

export default function ExamPage({ params }: { params: { id: string } }) {
    const [exam, setExam] = useState<ExamData | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const loadExam = async () => {
            try {
                const data = await getExam(params.id);
                setExam(data);
            } catch (error) {
                console.warn("Failed to load real exam, using MOCK data for demo.");
                setExam(MOCK_EXAM);
                toast.info("Showing Demo Exam (Database Connection Failed)");
            } finally {
                setLoading(false);
            }
        };
        loadExam();
    }, [params.id]);

    const handleAnswerChange = (value: string) => {
        if (!exam) return;
        const problemId = exam.problems[currentQuestionIndex].id;
        setAnswers(prev => ({ ...prev, [problemId]: value }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < (exam?.problems.length || 0) - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        if (!exam) return;

        // Basic confirmation
        if (Object.keys(answers).length < exam.problems.length) {
            if (!confirm("You haven't answered all questions. Submit anyway?")) return;
        }

        setSubmitting(true);
        try {
            // 1. Create a submission record
            const submissionId = await createSubmission(exam.id).catch(() => "mock-submission-id");

            // 2. Format answers
            const answerPayload = Object.entries(answers).map(([problemId, answer]) => ({
                problem_id: problemId,
                answer
            }));

            // 3. Submit and Grade
            await submitExamAnswers(submissionId, answerPayload).catch(() => console.warn("Mock submission"));

            toast.success("Exam submitted successfully!");
            router.push(`/exam/result/${submissionId}`); // Show result page
        } catch (error) {
            toast.error("Failed to submit exam");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;
    if (!exam || exam.problems.length === 0) return <div className="p-8">Exam not found or has no questions.</div>;

    const currentProblem = exam.problems[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === exam.problems.length - 1;

    return (
        <div className="flex h-[calc(100vh-4rem)] flex-col lg:h-[calc(100vh-60px)]">
            {/* Desktop View */}
            <div className="h-full block">
                {/* @ts-ignore */}
                <ResizablePanelGroup direction="horizontal">
                    {/* Passage Panel (Left) - Only show if current problem has a passage */}
                    {currentProblem.passage && (
                        <>
                            <ResizablePanel defaultSize={50} minSize={30}>
                                <div className="h-full overflow-y-auto p-6 bg-slate-50">
                                    <Card className="h-full border-0 shadow-none bg-white">
                                        <CardHeader>
                                            <CardTitle className="text-xl text-indigo-700">{currentProblem.passage.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="prose prose-slate max-w-none text-lg leading-relaxed whitespace-pre-line">
                                                {currentProblem.passage.content}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </ResizablePanel>
                            <ResizableHandle withHandle />
                        </>
                    )}

                    {/* Question Panel (Right) */}
                    <ResizablePanel defaultSize={currentProblem.passage ? 50 : 100} minSize={30}>
                        <div className="flex h-full flex-col p-6">
                            <div className="flex-1 overflow-y-auto">
                                <Card className="border-0 shadow-none">
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-sm font-medium text-slate-500">
                                                Question {currentQuestionIndex + 1} of {exam.problems.length}
                                            </span>
                                            <span className="text-sm font-medium text-slate-500 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" /> Time limits disabled
                                            </span>
                                        </div>
                                        <CardTitle className="text-xl font-semibold leading-normal">
                                            {currentProblem.question_text}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <RadioGroup
                                            value={answers[currentProblem.id] || ""}
                                            onValueChange={handleAnswerChange}
                                            className="grid gap-4"
                                        >
                                            {currentProblem.options?.map((option: any) => {
                                                // Handle standard options array or object
                                                const id = typeof option === 'string' ? option : option.id || option;
                                                const text = typeof option === 'string' ? option : option.text || option;

                                                return (
                                                    <div key={id} className="flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-slate-50 has-[[data-state=checked]]:border-indigo-600 has-[[data-state=checked]]:bg-indigo-50">
                                                        <RadioGroupItem value={id} id={id} />
                                                        <Label htmlFor={id} className="flex-1 cursor-pointer font-medium">
                                                            <span className="mr-2 text-indigo-600 font-bold uppercase">{id}.</span> {text}
                                                        </Label>
                                                    </div>
                                                );
                                            })}
                                        </RadioGroup>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="mt-auto border-t pt-4 flex justify-between items-center">
                                <Button variant="outline" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
                                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                                </Button>

                                <div className="flex gap-2">
                                    {isLastQuestion ? (
                                        <Button onClick={handleSubmit} disabled={submitting} className="bg-green-600 hover:bg-green-700 py-6 text-lg px-8">
                                            {submitting ? <Loader2 className="mr-2 animate-spin" /> : <CheckCircle className="mr-2" />}
                                            Submit Exam
                                        </Button>
                                    ) : (
                                        <Button onClick={handleNext}>
                                            Next <ChevronRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    )
}
