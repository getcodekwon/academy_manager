import { getWrongAnswers, type WrongAnswer } from "./actions";
import { WrongAnswerCard } from "./wrong-answer-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Brain, BookOpen } from "lucide-react";

export default async function MyMistakesPage() {
    // Try to fetch real data, fallback to mock if no data exists (for verifying UI)
    let mistakes = await getWrongAnswers().catch(() => []);

    if (mistakes.length === 0) {
        // Use Mock Data for Demo purposes so the user sees the UI
        mistakes = [
            {
                id: "1",
                student_answer: "to going",
                is_correct: false,
                ai_feedback: "The verb 'decide' is followed by the to-infinitive, not the gerund.",
                problem: {
                    id: "p1",
                    question_text: "Choose the correct form: She decided _______ (go) home early.",
                    options: ["going", "to go", "go", "went"],
                    correct_answer: "to go",
                    explanation: "'Decide' takes a to-infinitive. For example: I decided to study.",
                    tags: ["grammar", "to-infinitive"]
                },
                exam: {
                    title: "Weekly Grammar Quiz",
                    created_at: "2024-02-14"
                }
            },
            {
                id: "2",
                student_answer: "Photosynthesis is unnecessary for plants.",
                is_correct: false,
                ai_feedback: "This contradicts the main idea of the passage.",
                problem: {
                    id: "p2",
                    question_text: "What is the main idea of the paragraph about plants?",
                    options: [],
                    correct_answer: "Photosynthesis is vital for plant survival.",
                    explanation: "The passage explicitly states that without photosynthesis, plants cannot produce energy.",
                    tags: ["reading", "main-idea"]
                },
                exam: {
                    title: "Reading Comprehension Level 3",
                    created_at: "2024-02-10"
                }
            }
        ] as WrongAnswer[];
    }

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-8 max-w-4xl mx-auto">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <Brain className="h-6 w-6 text-orange-600" />
                    </div>
                    My Mistakes (오답노트)
                </h1>
                <p className="text-muted-foreground">
                    Review your incorrect answers and learn from them.
                    <span className="font-semibold text-orange-600 block sm:inline sm:ml-1">
                        Success comes from understanding your mistakes!
                    </span>
                </p>
            </div>

            <div className="grid gap-6">
                {mistakes.map((mistake) => (
                    <WrongAnswerCard key={mistake.id} item={mistake} />
                ))}
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border flex flex-col items-center justify-center text-center gap-2 mt-8">
                <BookOpen className="h-8 w-8 text-slate-400" />
                <h3 className="font-semibold text-slate-700">Want to practice more?</h3>
                <p className="text-sm text-slate-500 max-w-md">
                    Ask your teacher to generate a "Review Exam" based on your weak tags.
                </p>
            </div>
        </div>
    );
}
