"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { publishProblem, rejectProblem, type Problem } from "../actions";
import { toast } from "sonner";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface ReviewProblemCardProps {
    problem: Problem;
}

export function ReviewProblemCard({ problem }: ReviewProblemCardProps) {
    const [note, setNote] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePublish = async () => {
        try {
            setIsProcessing(true);
            await publishProblem(problem.id, note);
            toast.success("Problem published successfully!");
        } catch (error) {
            toast.error("Failed to publish problem");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReject = async () => {
        if (!note) {
            toast.error("Please provide a review note for rejection.");
            return;
        }
        try {
            setIsProcessing(true);
            await rejectProblem(problem.id, note);
            toast.info("Problem rejected/archived.");
        } catch (error) {
            toast.error("Failed to reject problem");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="flex gap-2">
                        <Badge variant="outline">{problem.type}</Badge>
                        <Badge variant="secondary" className={
                            problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                        }>{problem.difficulty}</Badge>
                    </div>
                    <span className="text-xs text-slate-400">{new Date(problem.created_at).toLocaleDateString()}</span>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-md text-sm whitespace-pre-wrap font-serif">
                    {problem.content}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500">Review Note (Optional for Approval)</label>
                    <Textarea
                        placeholder="Add comments about edits or reasons for rejection..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="text-sm"
                    />
                </div>
            </CardContent>
            <CardFooter className="justify-end gap-2 pt-0">
                <Button variant="outline" size="sm" onClick={handleReject} disabled={isProcessing} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <XCircle className="w-4 h-4 mr-1" />
                    Reject
                </Button>
                <Button size="sm" onClick={handlePublish} disabled={isProcessing} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve & Publish
                </Button>
            </CardFooter>
        </Card>
    );
}
