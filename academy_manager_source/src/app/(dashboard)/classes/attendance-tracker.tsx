"use client";

import { useState, useEffect } from "react";
import { type Student, type AttendanceRecord, upsertAttendance } from "./actions"; // Import from actions
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon, Check, X, Clock, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface AttendanceTrackerProps {
    classId: string;
    students: Student[];
    initialAttendance: AttendanceRecord[]; // Not used for initial load in this MVP, simpler to just fetch or assume empty
}

export function AttendanceTracker({ classId, students }: AttendanceTrackerProps) {
    const [date, setDate] = useState<Date>(new Date());

    // Local state for attendance: Map studentId -> status
    const [attendance, setAttendance] = useState<Record<string, string>>({});

    // Initialize all as 'present' by default
    useEffect(() => {
        const initial: Record<string, string> = {};
        students.forEach(s => initial[s.id] = "present");
        setAttendance(initial);
    }, [students]);

    const handleStatusChange = (studentId: string, status: string) => {
        setAttendance(prev => ({ ...prev, [studentId]: status }));
    };

    const handleSave = async () => {
        const records = Object.entries(attendance).map(([studentId, status]) => ({
            student_id: studentId,
            status,
            note: "" // Note feature to be added
        }));

        try {
            await upsertAttendance(classId, format(date, "yyyy-MM-dd"), records);
            toast.success("Attendance saved successfully!");
        } catch (error) {
            toast.error("Failed to save attendance.");
        }
    };

    const statusColors: Record<string, string> = {
        present: "bg-green-100 text-green-700 hover:bg-green-200",
        absent: "bg-red-100 text-red-700 hover:bg-red-200",
        late: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
        excused: "bg-blue-100 text-blue-700 hover:bg-blue-200"
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Attendance Check</CardTitle>
                <div className="flex items-center gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(d) => d && setDate(d)}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <Button onClick={handleSave}>Save</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="grid grid-cols-12 text-sm font-medium text-slate-500 border-b pb-2">
                        <div className="col-span-4">Student</div>
                        <div className="col-span-8">Status</div>
                    </div>
                    {students.map((student) => (
                        <div key={student.id} className="grid grid-cols-12 items-center py-2 border-b last:border-0">
                            <div className="col-span-4 flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={student.avatar_url || ""} />
                                    <AvatarFallback>{student.full_name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-sm">{student.full_name}</span>
                            </div>
                            <div className="col-span-8 flex gap-2">
                                {["present", "absent", "late", "excused"].map((status) => (
                                    <Button
                                        key={status}
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleStatusChange(student.id, status)}
                                        className={cn(
                                            "capitalize text-xs h-8 px-3 transition-colors",
                                            attendance[student.id] === status
                                                ? statusColors[status]
                                                : "text-slate-400 hover:bg-slate-100"
                                        )}
                                    >
                                        {status}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
