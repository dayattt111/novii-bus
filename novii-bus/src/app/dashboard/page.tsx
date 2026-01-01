import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import Navbar from '@/components/Navbar'
import DashboardForm from './DashboardForm'

export const revalidate = 60 // Cache halaman selama 60 detik

export default async function DashboardPage() {
  const user = await getSession()
  
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      <DashboardForm />
    </div>
  )
}

