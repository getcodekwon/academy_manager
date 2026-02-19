import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function StudentPage() {
    return (
        <div className="mx-auto grid w-full max-w-4xl gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold tracking-tight">Today's Tasks</h1>
                <p className="text-slate-500">You have 2 pending assignments due this week.</p>
            </div>

            <div className="grid gap-4">
                {/* Assignment Card 1 */}
                <Card className="border-l-4 border-l-red-500">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">Due Today</Badge>
                            <span className="text-sm text-slate-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" /> 23:59 PM
                            </span>
                        </div>
                        <CardTitle className="mt-2">Weekly Grammar Review: Ch.3</CardTitle>
                        <CardDescription>Class A • 20 Questions</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button className="w-full" asChild>
                            <Link href="/exam/1">Start Assignment <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardFooter>
                </Card>

                {/* Assignment Card 2 */}
                <Card className="border-l-4 border-l-yellow-500">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">Due Friday</Badge>
                            <span className="text-sm text-slate-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" /> 2 Days left
                            </span>
                        </div>
                        <CardTitle className="mt-2">Reading Comprehension: Science</CardTitle>
                        <CardDescription>Class A • 3 Passages</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button variant="secondary" className="w-full" asChild>
                            <Link href="/exam/2">Start Assignment <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            <div className="mt-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold tracking-tight">Recent Progress</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Vocabulary Quiz 02</CardTitle>
                            <CardDescription>Submitted Yesterday</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span className="font-bold text-lg">95/100</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Mock Test: March</CardTitle>
                            <CardDescription>Submitted 3 days ago</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-indigo-500" />
                                <span className="font-bold text-lg text-indigo-600">Review Feedback</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
