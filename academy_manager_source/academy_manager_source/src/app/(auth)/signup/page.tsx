import { signup } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";

export default async function SignupPage({
    searchParams,
}: {
    searchParams: Promise<{ message: string }>;
}) {
    const { message } = await searchParams;
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight text-center">
                        Create an Account
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your information to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="full_name">Full Name</Label>
                            <Input id="full_name" name="full_name" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>

                        <div className="space-y-2">
                            <Label>I am a...</Label>
                            <RadioGroup defaultValue="student" name="role" className="grid grid-cols-2 gap-4">
                                <div>
                                    <RadioGroupItem value="student" id="role-student" className="peer sr-only" />
                                    <Label
                                        htmlFor="role-student"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-slate-100 bg-white p-4 hover:bg-slate-50 hover:text-accent-foreground peer-data-[state=checked]:border-indigo-600 peer-data-[state=checked]:text-indigo-600 cursor-pointer"
                                    >
                                        <span className="text-xl mb-1">🎓</span>
                                        Student
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="teacher" id="role-teacher" className="peer sr-only" />
                                    <Label
                                        htmlFor="role-teacher"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-slate-100 bg-white p-4 hover:bg-slate-50 hover:text-accent-foreground peer-data-[state=checked]:border-indigo-600 peer-data-[state=checked]:text-indigo-600 cursor-pointer"
                                    >
                                        <span className="text-xl mb-1">👩‍🏫</span>
                                        Teacher
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {message && (
                            <div className="p-3 bg-green-50 text-green-700 text-sm rounded-md border border-green-200">
                                {message}
                            </div>
                        )}
                        <Button
                            formAction={signup}
                            className="w-full bg-indigo-600 hover:bg-indigo-700"
                        >
                            Sign Up
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 border-t pt-6">
                    <div className="text-center text-sm text-slate-500">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-indigo-600 hover:underline">
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
