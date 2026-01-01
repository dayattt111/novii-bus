'use client'

import Link from 'next/link'
import LogoutButton from './LogoutButton'

type User = {
  id: string
  nama: string
  email: string
} | null

export default function Navbar({ user }: { user?: User }) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Jalan Terus</h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            {user && (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-orange-600 transition font-medium">
                  Pesan Tiket
                </Link>
                <Link href="/pesanan" className="text-gray-700 hover:text-orange-600 transition font-medium">
                  Pesanan Saya
                </Link>
              </>
            )}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">{user.nama}</span>
                </span>
                <LogoutButton />
              </div>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-orange-600 transition font-medium">
                  Masuk
                </Link>
                <Link 
                  href="/register" 
                  className="bg-orange-600 text-white px-4 py-2 hover:bg-orange-700 transition font-medium"
                >
                  Daftar
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
