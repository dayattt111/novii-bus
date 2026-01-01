import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import NavbarWithAuth from '@/components/NavbarWithAuth'
import SeatSelectionForm from './SeatSelectionForm'

type Props = {
  searchParams: Promise<{
    busId?: string
    date?: string
  }>
}

export default async function SeatSelectionPage({ searchParams }: Props) {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  const params = await searchParams
  const busId = params.busId || ''
  const date = params.date || ''

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWithAuth />
      <SeatSelectionForm busId={busId} date={date} />
    </div>
  )
}
