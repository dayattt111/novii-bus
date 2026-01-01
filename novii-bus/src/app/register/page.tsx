'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { registerUser } from '@/app/actions/auth'

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, null)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <main className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 mb-8 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Jalan Terus</h1>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Buat Akun Baru
          </h2>
          <p className="text-gray-600">Daftar untuk mulai memesan tiket</p>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 p-8">
          <form action={formAction} className="space-y-6">
            {state?.error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3">
                {state.error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="nama"
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-orange-600 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="nama@email.com"
                required
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-orange-600 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Kata Sandi
              </label>
              <input
                type="password"
                name="password"
                placeholder="Minimal 8 karakter"
                required
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-orange-600 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white px-6 py-3 font-semibold hover:bg-orange-700 transition"
            >
              Daftar
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-orange-600 hover:text-orange-700 font-semibold">
              Masuk
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
