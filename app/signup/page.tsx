'use client'

import Link from "next/link";
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { SignUpSchema, SignUpResolver } from "@/schema/signup";
import { useRouter } from "next/navigation";
import { signUp } from "../actions/auth/signup";

export default function Page() {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const form = useForm<SignUpSchema>({
        defaultValues: { name: '', email: '', password: '' },
        resolver: SignUpResolver
    })
    const onSubmit = (formData: SignUpSchema) => {
        startTransition(() => {
            setError('')
            setSuccess('')
            signUp(formData).then((data) => {
                if (data.success) {
                    setSuccess(data.success)
                    router.push('/dashboard')
                } else if (data.error) {
                    setError(data.error)
                }
            }).catch(() => {
                setError('Something went wrong')
            })
        })
    }
    return (
        <main className="flex h-screen">
            {/* Left panel */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 flex-col justify-between p-12">
                <div>
                    <span className="text-white font-bold text-xl tracking-tight">ExpenseTracker</span>
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-white leading-tight mb-4">
                        Start tracking<br />in minutes.
                    </h1>
                    <p className="text-slate-400 text-base">
                        Create a free account and get a clear picture of your finances from day one.
                    </p>
                </div>
                <p className="text-slate-600 text-sm">© 2026 ExpenseTracker</p>
            </div>

            {/* Right panel */}
            <div className="flex flex-1 items-center justify-center bg-slate-50 px-6">
                <div className="w-full max-w-sm">
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">Create an account</h2>
                    <p className="text-slate-500 text-sm mb-8">Sign up to start tracking your expenses.</p>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                                Full name
                            </label>
                            <input
                                {...form.register('name')}
                                type="text"
                                id="name"
                                placeholder="John Doe"
                                required
                                className="w-full px-3.5 py-3 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                            />
                            {form.formState.errors.name &&
                                (<p className="mt-1.5 text-xs text-red-500">
                                    {form.formState.errors.name.message}
                                </p>)}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                                Email address
                            </label>
                            <input

                                {...form.register('email')}
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                required
                                className="w-full px-3.5 py-3 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                            />
                            {form.formState.errors.email &&
                                (<p className="mt-1.5 text-xs text-red-500">
                                    {form.formState.errors.email.message}
                                </p>)}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                                Password
                            </label>
                            <input
                                {...form.register('password')}
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                required
                                className="w-full px-3.5 py-3 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                            />
                            {form.formState.errors.password &&
                                (<p className="mt-1.5 text-xs text-red-500">
                                    {form.formState.errors.password.message}
                                </p>)}
                        </div>
                        {error && <p className="text-xs text-red-500">{error}</p>}
                        {success && <p className="text-xs text-green-500">{success}</p>}
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg transition-colors"
                        >
                            {isPending ? 'Registering ...' : 'Create Account'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-500">
                        Already have an account?{" "}
                        <Link href="/login" className="font-medium text-slate-900 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}
