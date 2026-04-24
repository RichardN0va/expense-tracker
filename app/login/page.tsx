'use client'

import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form"
import { LoginResolver, LoginSchema } from "@/schema/login";
import { useRouter } from "next/navigation";
import { login } from "../actions/auth/login";

export default function Page() {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const form = useForm<LoginSchema>({
        defaultValues: { email: '', password: '' },
        resolver: LoginResolver
    })
    const onSubmit = (formData: LoginSchema) => {
        startTransition(() => {
            setError('')
            setSuccess('')
            login(formData).then((data) => {
                if (data.success) {
                    setSuccess(data.success)
                    router.push('/dashboard')
                } else if (data.error) {
                    setError(data.error)
                }
            }).catch((data) => {
                setError(data.error)
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
                        Track your spending,<br />own your money.
                    </h1>
                    <p className="text-slate-400 text-base">
                        See exactly where your money goes every month and take back control of your finances.
                    </p>
                </div>
                <p className="text-slate-600 text-sm">© 2026 ExpenseTracker</p>
            </div>

            {/* Right panel */}
            <div className="flex flex-1 items-center justify-center bg-slate-50 px-6">
                <div className="w-full max-w-sm">
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h2>
                    <p className="text-slate-500 text-sm mb-8">Sign in to your account to continue.</p>

                    <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
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
                                    {form.formState.errors.email.message}</p>)}
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                <a href="#" className="text-xs text-slate-500 hover:text-slate-900">
                                    Forgot password?
                                </a>
                            </div>
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
                                    {form.formState.errors.password.message}</p>)}
                        </div>
                        {error && <p className="text-xs text-red-500">{error}</p>}
                        {success && <p className="text-xs text-green-600">{success}</p>}
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg transition-colors"
                        >
                            {isPending ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="font-medium text-slate-900 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}
