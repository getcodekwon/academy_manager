"use client";

import { useState } from "react";
import { type WrongAnswer } from "./actions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function WrongAnswerCard({ item }: { item: WrongAnswer }) {
    const [showExplanation, setShowExplanation] = useState(false);

    return (
        <Card className="border-l-4 border-l-orange-400">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <Badge variant="outline" className="mb-2 text-xs font-normal text-slate-500">
                            {item.exam?.title} • {new Date(item.exam?.created_at).toLocaleDateString()}
                        </Badge>
                        <CardTitle className="text-base font-medium leading-relaxed">
                            Q. {item.problem.question_text}
                        </CardTitle>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Answer Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-red-50 rounded-md border border-red-100">
                        <span className="flex items-center gap-2 text-red-700 font-semibold mb-1">
                            <XCircle className="w-4 h-4" /> Your Answer
                        </span>
                        <p className="text-slate-700">{item.student_answer || "(No Answer)"}</p>
                    </div>

                    {showExplanation && (
                        <div className="p-3 bg-green-50 rounded-md border border-green-100 animate-in fade-in">
                            <span className="flex items-center gap-2 text-green-700 font-semibold mb-1">
                                <CheckCircle className="w-4 h-4" /> Correct Answer
                            </span>
                            <p className="text-slate-700">{item.problem.correct_answer}</p>
                        </div>
                    )}
                </div>

                {/* Tags */}
                <div className="flex gap-2">
                    {item.problem.tags?.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-slate-100 text-slate-500 hover:bg-slate-200">
                            #{tag}
                        </Badge>
                    ))}
                </div>

                {/* Explanation Section */}
                {showExplanation && (
                    <div className="pt-2 border-t mt-2">
                        <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
                            <HelpCircle className="w-4 h-4 text-indigo-500" /> Explanation / AI Feedback
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-md">
                            {item.problem.explanation || item.ai_feedback || "No explanation provided."}
                        </p>
                    </div>
                )}

            </CardContent>
            <CardFooter className="pt-0 flex justify-end">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="text-slate-500 hover:text-indigo-600"
                >
                    {showExplanation ? (
                        <>Hide Solution <ChevronUp className="ml-2 h-4 w-4" /></>
                    ) : (
                        <>View Solution <ChevronDown className="ml-2 h-4 w-4" /></>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}
