"use server";

import { createClient } from "@/utils/supabase/server";

export type StudentAnalytics = {
    student: {
        id: string;
        full_name: string;
        avatar_url: string | null;
    };
    attendance: {
        present: number;
        absent: number;
        late: number;
        excused: number;
        attendance_rate: number;
    };
    performance: {
        average_score: number;
        class_average: number;
        completed_exams: number;
        total_assignments: number;
    };
    recent_activity: {
        id: string;
        type: "exam" | "class";
        title: string;
        date: string;
        score?: number;
        status: string;
    }[];
};

export async function getStudentAnalytics(studentId: string, classId?: string) {
    const supabase = await createClient();

    // 1. Fetch Student Profile
    const { data: student, error: studentError } = await supabase
        .from("users")
        .select("id, full_name, avatar_url")
        .eq("id", studentId)
        .single();

    if (studentError) throw new Error("Student not found");

    // 2. Fetch Attendance Stats
    let attendanceQuery = supabase
        .from("attendance")
        .select("status")
        .eq("student_id", studentId);

    if (classId) {
        attendanceQuery = attendanceQuery.eq("class_id", classId);
    }

    const { data: attendanceData } = await attendanceQuery;

    const attendanceStats = (attendanceData || []).reduce((acc, curr) => {
        acc[curr.status as keyof typeof acc]++;
        return acc;
    }, { present: 0, absent: 0, late: 0, excused: 0 });

    const totalDays = (attendanceData || []).length;
    const attendanceRate = totalDays > 0
        ? Math.round(((attendanceStats.present + attendanceStats.late) / totalDays) * 100)
        : 100;

    // 3. Fetch Submissions (Performance)
    // For MVP, we'll mock the class average logic or do a simple separate query if needed.
    // Getting real class average requires aggregation across all students in the class.

    const { data: submissions } = await supabase
        .from("submissions")
        .select("score, exams(title, created_at)")
        .eq("student_id", studentId);

    const myScores = (submissions || []).map(s => s.score || 0);
    const myAverage = myScores.length > 0
        ? Math.round(myScores.reduce((a, b) => a + b, 0) / myScores.length)
        : 0;

    // Mock Class Average for now (would be a heavy query in production without materialized views)
    const mockClassAverage = 75 + Math.floor(Math.random() * 10);

    return {
        student: student,
        attendance: {
            ...attendanceStats,
            attendance_rate: attendanceRate
        },
        performance: {
            average_score: myAverage,
            class_average: mockClassAverage,
            completed_exams: submissions?.length || 0,
            total_assignments: 10 // Mock total
        },
        recent_activity: [
            { id: "1", type: "exam", title: "Weekly Vocab Quiz", date: "2024-02-15", score: 85, status: "Completed" },
            { id: "2", type: "class", title: "Attendance", date: "2024-02-16", status: "Present" } // Combined feed
        ]
    } as StudentAnalytics;
}

export async function getClassAnalytics(classId: string) {
    // Return summary for the whole class
    return {
        class_average: 78,
        attendance_rate: 92,
        top_students: [],
        low_performance_students: []
    }
}
