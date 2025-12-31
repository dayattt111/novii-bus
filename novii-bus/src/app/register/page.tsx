'use client'

import Link from 'next/link'
import { useFormState } from 'react-dom'
import { registerUser } from '@/app/actions/auth'

export default function RegisterPage() {
  const [state, formAction] = useFormState(registerUser, null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-900 rounded"></div>
              <h1 className="text-xl font-bold">SulawesiTrip</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900">Beranda</Link>
              <Link href="/" className="text-gray-700 hover:text-gray-900">Pesan Tiket</Link>
              <Link href="/" className="text-gray-700 hover:text-gray-900">Jadwal</Link>
              <Link href="/" className="text-gray-700 hover:text-gray-900">Kontak</Link>
              <Link href="/login" className="text-gray-700 hover:text-gray-900">Masuk</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Register Form */}
      <main className="max-w-md mx-auto px-4 py-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Buat Akun
          </h2>
        </div>

        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {state.error}
            </div>
          )}

          <div>
            <input
              type="text"
              name="nama"
              placeholder="Nama"
              required
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Kata Sandi"
              required
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Daftar
          </button>

          <p className="text-center text-sm text-gray-600">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-700">
              Masuk
            </Link>
          </p>
        </form>
      </main>
    </div>
  )
}
