import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Users,
    BookOpen,
    FileCheck,
    Zap,
    ArrowUpRight,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StudentPerformanceChart } from "@/components/dashboard/performance-chart"

export default function DashboardPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">128</div>
                        <p className="text-xs text-muted-foreground">
                            +12% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">
                            3 classes today
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
                        <FileCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">
                            Needs attention
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">AI Credits</CardTitle>
                        <Zap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2,400</div>
                        <p className="text-xs text-muted-foreground">
                            Auto-refills in 5 days
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-7">
                <div className="col-span-4">
                    <StudentPerformanceChart />
                </div>
                <Card className="xl:col-span-3">
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>
                                Recent student submissions and AI generations.
                            </CardDescription>
                        </div>
                        <Button asChild size="sm" className="ml-auto gap-1">
                            <Link href="/analytics">
                                View All
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-8">
                            {/* Mock Activity Items */}
                            <div className="flex items-center gap-4">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 sm:flex">
                                    <FileCheck className="h-5 w-5 text-indigo-600" />
                                </div>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        Minji Kim submitted "Weekly Review 03"
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Class A • 2 minutes ago
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">92/100</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 sm:flex">
                                    <Zap className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        AI generated 20 problems for "To-Infinitive"
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Problem Bank • 15 minutes ago
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 sm:flex">
                                    <Users className="h-5 w-5 text-slate-600" />
                                </div>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        3 new students joined "Class B"
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Class Management • 1 hour ago
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
