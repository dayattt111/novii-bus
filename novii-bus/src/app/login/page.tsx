'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { loginUser } from '@/app/actions/auth'

export default function LoginPage() {
  const [state, formAction] = useActionState(loginUser, null)

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Login Form */}
      <main className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 mb-8 hover:opacity-80 transition">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">🚌</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Jalan Terus</h1>
          </Link>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Selamat Datang! 👋
          </h2>
          <p className="text-gray-600">Masuk untuk melanjutkan petualanganmu</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-orange-100 p-8">
          <form action={formAction} className="space-y-5">
            {state?.error && (
              <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded-lg">
                ⚠️ {state.error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📧 Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="nama@email.com"
                required
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔒 Kata Sandi
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              🚀 Masuk
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Belum punya akun?{' '}
            <Link href="/register" className="text-orange-500 hover:text-orange-600 font-semibold">
              Daftar Sekarang ✨
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
