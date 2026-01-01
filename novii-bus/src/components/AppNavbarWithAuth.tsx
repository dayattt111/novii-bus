import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AppNavbar from './AppNavbar'

export default async function AppNavbarWithAuth() {
  const user = await getSession()
  
  if (!user) {
    redirect('/login')
  }

  return <AppNavbar user={user} />
}
