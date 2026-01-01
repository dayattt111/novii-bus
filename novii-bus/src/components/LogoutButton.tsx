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
      className="border-2 border-orange-300 text-orange-600 px-4 py-1.5 rounded-full hover:bg-orange-50 transition text-sm font-medium"
    >
      Keluar
    </button>
  )
}
