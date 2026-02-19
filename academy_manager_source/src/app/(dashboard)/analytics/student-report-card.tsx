"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Download, Share2, Mail } from "lucide-react";
import { type StudentAnalytics } from "./actions";

export function StudentReportCard({ data }: { data: StudentAnalytics }) {

    const getGradeColor = (score: number) => {
        if (score >= 90) return "text-green-600";
        if (score >= 80) return "text-blue-600";
        if (score >= 70) return "text-yellow-600";
        return "text-red-600";
    };

    return (
        <Card className="w-full max-w-2xl mx-auto print:shadow-none print:border-none">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                <Avatar className="h-16 w-16">
                    <AvatarImage src={data.student.avatar_url || ""} />
                    <AvatarFallback>{data.student.full_name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <CardTitle className="text-2xl">{data.student.full_name}</CardTitle>
                    <CardDescription>Monthly Performance Report • February 2024</CardDescription>
                </div>
                <div className="flex gap-2 print:hidden">
                    <Button size="icon" variant="outline"><Download className="h-4 w-4" /></Button>
                    <Button size="icon" variant="outline"><Mail className="h-4 w-4" /></Button>
                </div>
            </CardHeader>

            <Separator />

            <CardContent className="grid gap-6 pt-6">

                {/* Attendance Section */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-lg flex justify-between">
                        <span>Attendance</span>
                        <span className={data.attendance.attendance_rate < 80 ? 'text-red-500' : 'text-green-600'}>
                            {data.attendance.attendance_rate}% Rate
                        </span>
                    </h3>
                    <div className="grid grid-cols-4 gap-2 text-center">
                        <div className="bg-green-50 p-2 rounded">
                            <div className="text-xl font-bold text-green-700">{data.attendance.present}</div>
                            <div className="text-xs text-green-600 uppercase font-semibold">Present</div>
                        </div>
                        <div className="bg-red-50 p-2 rounded">
                            <div className="text-xl font-bold text-red-700">{data.attendance.absent}</div>
                            <div className="text-xs text-red-600 uppercase font-semibold">Absent</div>
                        </div>
                        <div className="bg-yellow-50 p-2 rounded">
                            <div className="text-xl font-bold text-yellow-700">{data.attendance.late}</div>
                            <div className="text-xs text-yellow-600 uppercase font-semibold">Late</div>
                        </div>
                        <div className="bg-blue-50 p-2 rounded">
                            <div className="text-xl font-bold text-blue-700">{data.attendance.excused}</div>
                            <div className="text-xs text-blue-600 uppercase font-semibold">Excused</div>
                        </div>
                    </div>
                </div>

                {/* Academic Performance */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Academic Performance</h3>

                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span>My Average Score</span>
                            <span className={cn("font-bold", getGradeColor(data.performance.average_score))}>
                                {data.performance.average_score} / 100
                            </span>
                        </div>
                        <Progress value={data.performance.average_score} className="h-2" />

                        <div className="flex justify-between text-sm text-muted-foreground pt-1">
                            <span>Class Average</span>
                            <span>{data.performance.class_average} / 100</span>
                        </div>
                        {/* Overlay class average marker if possible, or just show text for simple UI */}
                    </div>
                </div>

                {/* Recent Activity / Feedback */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Recent Activity</h3>
                    <div className="border rounded-md divide-y">
                        {data.recent_activity.map((activity) => (
                            <div key={activity.id} className="p-3 flex justify-between items-center text-sm">
                                <div>
                                    <div className="font-medium">{activity.title}</div>
                                    <div className="text-xs text-slate-500">{activity.date}</div>
                                </div>
                                <Badge variant={activity.type === 'exam' ? 'outline' : 'secondary'}>
                                    {activity.score ? `${activity.score} pts` : activity.status}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">Teacher's Note</h4>
                    <p className="text-sm text-slate-600 italic">
                        "{data.student.full_name} is showing great improvement in reading comprehension.
                        Please encourage steady attendance to maintain this momentum."
                    </p>
                </div>

            </CardContent>
            <CardFooter className="bg-slate-50 text-xs text-slate-400 justify-center py-3 print:hidden">
                Generated automatically by Antigravity Academy Manager
            </CardFooter>
        </Card>
    );
}

// Helper for conditional classes
function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ");
}
