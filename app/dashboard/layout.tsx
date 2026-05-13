import type { ReactNode } from "react"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import SignOutButton from "@/app/dashboard/sign-out-button"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const session = await auth()
    if (!session) redirect("/login")

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <header className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-800">
                <span className="text-white font-bold text-lg tracking-tight">ExpenseTracker</span>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">
                                {session.user?.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <span className="text-slate-300 text-sm hidden sm:block">{session.user?.name}</span>
                    </div>
                    <div className="w-px h-4 bg-slate-700" />
                    <SignOutButton />
                </div>
            </header>
            <main className="max-w-5xl mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    )
}