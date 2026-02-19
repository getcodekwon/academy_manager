"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ClassItem = {
    id: string;
    name: string;
    description: string | null;
    schedule: string | null;
    student_count?: number;
};

export type Student = {
    id: string;
    full_name: string;
    email: string | null;
    avatar_url: string | null;
};

export type AttendanceRecord = {
    id: string;
    student_id: string;
    date: string;
    status: "present" | "absent" | "late" | "excused";
    note: string | null;
};

export async function getTeacherClasses() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        // Redirect to login if no user
        redirect("/login");
    }

    // Get classes created by the teacher
    const { data: classes, error } = await supabase
        .from("classes")
        .select("*, enrollments(count)")
        .eq("teacher_id", user.id)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching classes:", error);
        throw new Error("Failed to fetch classes");
    }

    return classes.map((c: any) => ({
        ...c,
        student_count: c.enrollments?.[0]?.count || 0
    })) as ClassItem[];
}

export async function getClassDetails(classId: string) {
    const supabase = await createClient();
    const { data: classData, error } = await supabase
        .from("classes")
        .select("*")
        .eq("id", classId)
        .single();

    if (error) throw new Error("Class not found");
    return classData as ClassItem;
}

export async function getClassStudents(classId: string) {
    const supabase = await createClient();

    // Join enrollments with users to get student details
    const { data, error } = await supabase
        .from("enrollments")
        .select("student:users(id, full_name, email, avatar_url)")
        .eq("class_id", classId);

    if (error) {
        console.error("Error fetching students:", error);
        throw new Error("Failed to fetch students");
    }

    // Flatten the result
    return data.map((item: any) => item.student) as Student[];
}

export async function getAttendance(classId: string, date: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("attendance")
        .select("*")
        .eq("class_id", classId)
        .eq("date", date);

    if (error) throw new Error("Failed to fetch attendance");
    return data as AttendanceRecord[];
}

export async function upsertAttendance(classId: string, date: string, records: { student_id: string; status: string; note?: string }[]) {
    const supabase = await createClient();

    const updates = records.map(r => ({
        class_id: classId,
        student_id: r.student_id,
        date: date,
        status: r.status,
        note: r.note
    }));

    const { error } = await supabase
        .from("attendance")
        .upsert(updates, { onConflict: "class_id, student_id, date" }); // Requires unique constraint in DB or precise policy

    if (error) {
        console.error("Error saving attendance:", error);
        throw new Error("Failed to save attendance");
    }

    revalidatePath(`/classes/${classId}`);
}
