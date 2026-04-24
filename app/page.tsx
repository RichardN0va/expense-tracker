import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <span className="font-bold text-slate-900 text-lg tracking-tight">ExpenseTracker</span>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="text-sm font-semibold text-white bg-slate-900 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center flex-1 px-6 py-24">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
          Personal Finance
        </span>
        <h1 className="text-5xl font-bold text-slate-900 leading-tight max-w-2xl mb-6">
          Know exactly where your money goes
        </h1>
        <p className="text-lg text-slate-500 max-w-md mb-10">
          ExpenseTracker helps you log, categorize, and understand your spending — so you can make smarter financial decisions.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/signup"
            className="px-6 py-3 bg-slate-900 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Start for free
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 border border-slate-300 hover:border-slate-400 text-slate-700 text-sm font-semibold rounded-lg transition-colors"
          >
            Sign in
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">
            Everything you need to track your finances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
              <div className="w-10 h-10 bg-slate-900 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-lg">📋</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Log Expenses</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Quickly add expenses with a title, amount, category, and date. Keep your records clean and up to date.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
              <div className="w-10 h-10 bg-slate-900 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-lg">🗂️</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Categorize</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Organize your spending into categories so you can see at a glance what you are spending the most on.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
              <div className="w-10 h-10 bg-slate-900 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-lg">🔒</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Private & Secure</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Your data is tied to your account only. No one else can see your expenses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-slate-100 text-center">
        <p className="text-sm text-slate-400">© 2026 ExpenseTracker. All rights reserved.</p>
      </footer>
    </div>
  )
}
