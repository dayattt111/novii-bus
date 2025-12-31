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
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-blue-600 rounded"></div>
            <h1 className="text-xl font-bold text-gray-900">Ovii-Bus</h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {user && (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition">
                  Pesan Tiket
                </Link>
                <Link href="/pesanan" className="text-gray-700 hover:text-blue-600 transition">
                  Pesanan Saya
                </Link>
              </>
            )}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Halo, <span className="font-medium text-gray-900">{user.nama}</span>
                </span>
                <LogoutButton />
              </div>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-blue-600 transition">
                  Masuk
                </Link>
                <Link 
                  href="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
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
