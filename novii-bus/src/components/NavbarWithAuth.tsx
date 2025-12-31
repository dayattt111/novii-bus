import { getSession } from '@/lib/auth'
import Navbar from './Navbar'

export default async function NavbarWithAuth() {
  const user = await getSession()
  
  return <Navbar user={user} />
}
