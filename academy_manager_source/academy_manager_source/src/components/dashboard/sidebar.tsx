"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Users,
    Library,
    BarChart3,
    Settings,
    LogOut,
    GraduationCap
} from "lucide-react"

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Class Management",
        href: "/classes",
        icon: Users,
    },
    {
        title: "Problem Bank",
        href: "/library",
        icon: Library,
    },
    {
        title: "Analytics",
        href: "/analytics",
        icon: BarChart3,
    },
    {
        title: "Settings",
        href: "/settings",
        icon: Settings,
    },
]

export function DashboardSidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-full flex-col border-r bg-slate-50/40">
            <div className="flex h-14 items-center border-b px-6 lg:h-[60px]">
                <Link href="/" className="flex items-center gap-2 font-bold text-indigo-600">
                    <GraduationCap className="h-6 w-6" />
                    <span>Academy Manager</span>
                </Link>
            </div>
            <div className="flex-1 py-4">
                <nav className="grid items-start px-4 text-sm font-medium">
                    {sidebarItems.map((item, index) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-indigo-600",
                                    isActive
                                        ? "bg-indigo-50 text-indigo-600"
                                        : "text-slate-500 hover:bg-slate-100"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.title}
                            </Link>
                        )
                    })}
                </nav>
            </div>
            <div className="mt-auto border-t p-4">
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-all hover:bg-slate-100 hover:text-red-600">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </div>
    )
}
