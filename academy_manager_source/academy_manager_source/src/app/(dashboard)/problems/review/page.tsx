import { getDraftProblems } from "../actions";
import { ReviewProblemCard } from "./review-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck } from "lucide-react";

export default async function ProblemReviewPage() {
    const drafts = await getDraftProblems();

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">AI Problem Review</h1>
                <p className="text-muted-foreground">
                    Verify and edit AI-generated drafts to secure IP ownership before publishing.
                </p>
            </div>

            <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                <ShieldCheck className="h-4 w-4 stroke-blue-800" />
                <AlertTitle>IP Protection Active</AlertTitle>
                <AlertDescription>
                    Only problems reviewed and published by a human teacher are visible to students.
                </AlertDescription>
            </Alert>

            {drafts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-lg border border-dashed">
                    <p className="text-slate-500">No drafts pending review.</p>
                    <p className="text-xs text-slate-400 mt-1">Generate new problems in the Library to see them here.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                    {drafts.map((problem) => (
                        <ReviewProblemCard key={problem.id} problem={problem} />
                    ))}
                </div>
            )}
        </div>
    );
}
