import { getTeacherClasses } from "./actions";
import { ClassCard } from "./class-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function ClassesPage() {
    const classes = await getTeacherClasses();

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight">Class Management</h1>
                    <p className="text-muted-foreground">Manage your classes, students, and attendance.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add New Class
                </Button>
            </div>

            {classes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-lg border border-dashed">
                    <p className="text-slate-500">No classes found.</p>
                    <p className="text-sm text-slate-400 mt-1">Create your first class to get started.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {classes.map((c) => (
                        <ClassCard key={c.id} classItem={c} />
                    ))}
                </div>
            )}
        </div>
    );
}
