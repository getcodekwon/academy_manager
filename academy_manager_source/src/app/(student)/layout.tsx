import Link from "next/link"
import { GraduationCap, Home, BookOpen, User } from "lucide-react"

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-slate-50">
            <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-white px-4 md:px-6">
                <Link href="/my-learning" className="flex items-center gap-2 font-bold text-indigo-600">
                    <GraduationCap className="h-6 w-6" />
                    <span>Academy Student</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link href="/my-learning" className="text-sm font-medium hover:underline underline-offset-4">
                        My Learning
                    </Link>
                    <Link href="/profile" className="text-sm font-medium hover:underline underline-offset-4">
                        Profile
                    </Link>
                </nav>
            </header>
            <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
                {children}
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-white md:hidden">
                <Link href="/my-learning" className="flex flex-col items-center gap-1 text-xs font-medium text-indigo-600">
                    <Home className="h-5 w-5" />
                    Home
                </Link>
                <Link href="/assignments" className="flex flex-col items-center gap-1 text-xs font-medium text-slate-500 hover:text-indigo-600">
                    <BookOpen className="h-5 w-5" />
                    Tasks
                </Link>
                <Link href="/profile" className="flex flex-col items-center gap-1 text-xs font-medium text-slate-500 hover:text-indigo-600">
                    <User className="h-5 w-5" />
                    Profile
                </Link>
            </nav>
        </div>
    )
}
