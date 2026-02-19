import { login } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ message?: string; error?: string; success?: string }>;
}) {
    const { message, error, success } = await searchParams;

    // Legacy support for 'message' param - treat as error if not specified
    const errorMessage = error || message;
    const successMessage = success;

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight text-center">
                        Academy Manager
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your email to sign in to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="teacher@academy.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="#"
                                    className="text-sm font-medium text-indigo-600 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Input id="password" name="password" type="password" required />
                        </div>

                        {errorMessage && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200 font-medium">
                                ⚠️ {errorMessage}
                            </div>
                        )}

                        {successMessage && (
                            <div className="p-3 bg-green-50 text-green-600 text-sm rounded-md border border-green-200 font-medium">
                                ✅ {successMessage}
                            </div>
                        )}

                        <Button
                            formAction={login}
                            className="w-full bg-indigo-600 hover:bg-indigo-700"
                        >
                            Sign In
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 border-t pt-6">
                    <div className="text-center text-sm text-slate-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="font-semibold text-indigo-600 hover:underline">
                            Sign up
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
