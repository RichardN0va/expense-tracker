import { auth } from "@/auth"
import { redirect } from "next/navigation"
import ExpenseForm from "./expense-form"
import { prisma } from "@/app/lib/db"

export default async function Page() {
    const session = await auth()
    if (!session) redirect('/login')

    const expenses = await prisma.expenses.findMany({
        where: { userId: session?.user?.id as string },
        orderBy: { date: 'desc' },
    })

    const total = expenses.reduce((sum, e) => sum + e.amount, 0)

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-500 text-sm mt-1">Track and manage your expenses.</p>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 text-white">
                <p className="text-slate-400 text-sm">Total spent</p>
                <p className="text-3xl font-bold mt-1">${total.toFixed(2)}</p>
                <p className="text-slate-400 text-sm mt-1">{expenses.length} expense{expenses.length !== 1 ? 's' : ''}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <ExpenseForm />
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl border border-slate-200">
                        <div className="px-6 py-4 border-b border-slate-100">
                            <h2 className="text-lg font-semibold text-slate-900">Recent Expenses</h2>
                        </div>
                        {expenses.length === 0 ? (
                            <div className="px-6 py-12 text-center">
                                <p className="text-slate-400 text-sm">No expenses yet. Add your first one.</p>
                            </div>
                        ) : (
                            <ul className="divide-y divide-slate-100">
                                {expenses.map((expense) => (
                                    <li key={expense.id} className="px-6 py-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{expense.title}</p>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                {expense.category} · {new Date(expense.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-900">${expense.amount.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
