'use client'

import { logoutUser } from '@/app/actions/auth'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await logoutUser()
    router.push('/')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-5 py-2 rounded-full hover:shadow-lg transition-all text-sm font-semibold transform hover:-translate-y-0.5"
    >
      👋 Keluar
    </button>
  )
}
