import { getClassDetails, getClassStudents } from "./actions";
import { AttendanceTracker } from "./attendance-tracker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function ClassDetailPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const classItem = await getClassDetails(id);
    const students = await getClassStudents(id);

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight">{classItem.name}</h1>
                <p className="text-muted-foreground">{classItem.description || "Class Management"}</p>
                <p className="text-sm text-slate-500 mt-1">Schedule: {classItem.schedule || "TBD"}</p>
            </div>

            <Tabs defaultValue="attendance" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    <TabsTrigger value="students">Student Roster</TabsTrigger>
                    <TabsTrigger value="assignments">Assignments</TabsTrigger>
                </TabsList>

                <TabsContent value="attendance" className="space-y-4">
                    <AttendanceTracker classId={id} students={students} initialAttendance={[]} />
                </TabsContent>

                <TabsContent value="students" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Student Roster ({students.length})</CardTitle>
                            <CardDescription>Manage enrolled students.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {students.map((student) => (
                                    <div key={student.id} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                                        <Avatar>
                                            <AvatarImage src={student.avatar_url || ""} />
                                            <AvatarFallback>{student.full_name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{student.full_name}</div>
                                            <div className="text-xs text-slate-500">{student.email}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {students.length === 0 && (
                                <p className="text-sm text-slate-500 text-center py-4">No students enrolled yet.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="assignments">
                    <Card>
                        <CardHeader>
                            <CardTitle>Assignments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-500 text-sm">Assignment management coming soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
