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
      className="border border-gray-300 text-gray-700 px-4 py-2 hover:bg-gray-50 transition text-sm font-medium"
    >
      Keluar
    </button>
  )
}
