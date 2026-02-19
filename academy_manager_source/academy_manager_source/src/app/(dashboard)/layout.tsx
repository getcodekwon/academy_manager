import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[240px_1fr]">
            <div className="hidden border-r bg-slate-50/40 lg:block dark:bg-slate-800/40">
                <DashboardSidebar />
            </div>
            <div className="flex flex-col">
                <DashboardHeader />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-slate-50/30">
                    {children}
                </main>
            </div>
        </div>
    )
}
