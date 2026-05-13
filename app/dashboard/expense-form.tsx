"use client";
import { useTransition } from "react";
import { addExpense } from "@/app/actions/expense/add";

export default function ExpenseForm() {
    const [isPending, startTransition] = useTransition();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            const formData = new FormData(e.currentTarget);
            addExpense(formData).then((data) => {
                if (data.success) {
                    (e.target as HTMLFormElement).reset();
                } else if (data.error) {
                    console.error(data.error);
                }
            });
        });
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-5">Add Expense</h2>
            <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="e.g. Grocery run"
                        required
                        className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Amount ($)
                    </label>
                    <input
                        type="number"
                        name="amount"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        required
                        className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent
                        [appearance:textfield]
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Category
                    </label>
                    <select
                        name="category"
                        required
                        defaultValue=""
                        className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg shadow-sm appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 20 20%22%3E%3Cpath stroke=%22%236b7280%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22m6 8 4 4 4-4%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25rem] pr-10 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    >
                        <option value="" disabled>
                            Select category
                        </option>
                        <option value="Food">Food</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Housing">Housing</option>
                        <option value="Health">Health</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        required
                        defaultValue={new Date().toISOString().split("T")[0]}
                        className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-700 disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                    {isPending ? "Adding..." : "Add Expense"}
                </button>
            </form>
        </div>
    );
}
