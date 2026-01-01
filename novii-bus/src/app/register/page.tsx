'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { registerUser } from '@/app/actions/auth'

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, null)

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <main className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-8 hover:opacity-80 transition">
            <h1 className="text-3xl font-bold">
              <span className="text-blue-500">J</span>
              <span className="text-yellow-500">A</span>
              <span className="text-orange-500">L</span>
              <span className="text-teal-400">A</span>
              <span className="text-red-500">N</span>
              <span className="text-gray-700"> </span>
              <span className="text-orange-600">T</span>
              <span className="text-yellow-500">E</span>
              <span className="text-red-500">R</span>
              <span className="text-blue-500">U</span>
              <span className="text-orange-500">S</span>
            </h1>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Buat Akun Baru
          </h2>
          <p className="text-gray-600">Daftar untuk mulai memesan tiket</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm shadow-xl border-2 border-orange-100 rounded-2xl p-8">
          <form action={formAction} className="space-y-6">
            {state?.error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded">
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
                placeholder="Novyani K Putri"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 transition"
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 transition"
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition"
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
