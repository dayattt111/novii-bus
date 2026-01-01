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
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition group">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition">
              <span className="text-white text-xl font-bold">🚌</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Jalan Terus</h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {user && (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-orange-500 transition font-medium">
                  🎫 Pesan Tiket
                </Link>
                <Link href="/pesanan" className="text-gray-700 hover:text-orange-500 transition font-medium">
                  📋 Pesanan Saya
                </Link>
              </>
            )}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 bg-orange-50 px-4 py-2 rounded-full">
                  👋 <span className="font-semibold text-orange-600">{user.nama}</span>
                </span>
                <LogoutButton />
              </div>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-orange-500 transition font-medium">
                  Masuk
                </Link>
                <Link 
                  href="/register" 
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2.5 rounded-full hover:shadow-lg transition-all font-medium"
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
