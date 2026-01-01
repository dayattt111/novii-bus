import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import NavbarWithAuth from '@/components/NavbarWithAuth'
import DashboardForm from './DashboardForm'

export default async function DashboardPage() {
  const user = await getSession()
  
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWithAuth />
      <DashboardForm />
    </div>
  )
}

