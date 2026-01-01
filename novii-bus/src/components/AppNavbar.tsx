'use client'

import Link from 'next/link'
import LogoutButton from './LogoutButton'

type User = {
  id: string
  nama: string
  email: string
}

export default function AppNavbar({ user }: { user: User }) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="flex items-center space-x-2 hover:opacity-80 transition">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 20H7V21C7 21.5523 6.55228 22 6 22H4C3.44772 22 3 21.5523 3 21V12.4868L1.5 13.5L1 12.5L2.5 11.5V7C2.5 6.44772 2.94772 6 3.5 6H20.5C21.0523 6 21.5 6.44772 21.5 7V11.5L23 12.5L22.5 13.5L21 12.4868V21C21 21.5523 20.5523 22 20 22H18C17.4477 22 17 21.5523 17 21V20ZM19.5 11.6667L19.5 8H4.5V11.6667L12 7L19.5 11.6667ZM5 19H19V13L12 9L5 13V19ZM7.5 14.5C7.5 13.6716 8.17157 13 9 13C9.82843 13 10.5 13.6716 10.5 14.5C10.5 15.3284 9.82843 16 9 16C8.17157 16 7.5 15.3284 7.5 14.5ZM13.5 14.5C13.5 13.6716 14.1716 13 15 13C15.8284 13 16.5 13.6716 16.5 14.5C16.5 15.3284 15.8284 16 15 16C14.1716 16 13.5 15.3284 13.5 14.5Z"/>
              </svg>
            </div>
            <h1 className="text-lg font-bold text-gray-900">Jalan Terus</h1>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-gray-700 hover:text-orange-600 transition font-medium">
              Pesan Tiket
            </Link>
            <Link href="/pesanan" className="text-gray-700 hover:text-orange-600 transition font-medium">
              Pesanan Saya
            </Link>
            
            <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
              <span className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{user.nama}</span>
              </span>
              <LogoutButton />
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
