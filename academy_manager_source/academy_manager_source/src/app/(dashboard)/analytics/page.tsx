import { StudentReportCard } from "./student-report-card";
import { getStudentAnalytics } from "./actions";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock student ID for demo - in reality, would be selected from a list or param
const DEMO_STUDENT_ID = "mock-student-id";

export default async function AnalyticsPage() {

    // In a real app, we'd fetch the list of students here to let the teacher select one.
    // For this demo, we'll construct mock data directly in the UI if the fetch fails, 
    // or use the action if we had real synced data.

    // Let's use a mock object directly for the UI Demo to ensure it renders beautifully
    // without relying on the seed script's volatile IDs.
    const mockData = {
        student: {
            id: "1",
            full_name: "Alice Kim",
            avatar_url: null
        },
        attendance: {
            present: 18,
            absent: 1,
            late: 1,
            excused: 0,
            attendance_rate: 90
        },
        performance: {
            average_score: 88,
            class_average: 74,
            completed_exams: 5,
            total_assignments: 6
        },
        recent_activity: [
            { id: "101", type: "exam" as const, title: "Mid-term Grammar Test", date: "Feb 14, 2024", score: 92, status: "Completed" },
            { id: "102", type: "exam" as const, title: "Vocabulary Week 3", date: "Feb 10, 2024", score: 84, status: "Completed" },
            { id: "103", type: "class" as const, title: "Reading Class", date: "Feb 16, 2024", status: "Present" }
        ]
    };

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight">Parent Reports</h1>
                    <p className="text-muted-foreground">Generate and send performance reports to parents.</p>
                </div>

                <div className="flex items-center gap-2">
                    <Select>
                        <SelectTrigger className="w-[200px] bg-white">
                            <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="c1">English 101</SelectItem>
                            <SelectItem value="c2">Math Advanced</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-[200px] bg-white">
                            <SelectValue placeholder="Select Student" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="s1">Alice Kim</SelectItem>
                            <SelectItem value="s2">Bob Lee</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex justify-center bg-slate-100/50 p-6 rounded-xl border border-dashed">
                <StudentReportCard data={mockData} />
            </div>
        </div>
    );
}
