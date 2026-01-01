import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import NavbarWithAuth from '@/components/NavbarWithAuth'
import BusSelectionForm from './BusSelectionForm'

type Props = {
  searchParams: Promise<{
    from?: string
    to?: string
    date?: string
  }>
}

export default async function BusSelectionPage({ searchParams }: Props) {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  const params = await searchParams
  const from = params.from || ''
  const to = params.to || ''
  const date = params.date || ''

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWithAuth />
      <BusSelectionForm from={from} to={to} date={date} />
    </div>
  )
}
