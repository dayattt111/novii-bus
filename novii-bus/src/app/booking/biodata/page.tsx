import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import NavbarWithAuth from '@/components/NavbarWithAuth'
import BiodataForm from './BiodataForm'

type Props = {
  searchParams: Promise<{
    busId?: string
    seatId?: string
    seatIds?: string
    harga?: string
    date?: string
  }>
}

export default async function BiodataPage({ searchParams }: Props) {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  const params = await searchParams
  const busId = params.busId || ''
  const seatId = params.seatId || ''
  const seatIds = params.seatIds || seatId // Support both single and multiple seats
  const harga = params.harga || ''
  const date = params.date || ''

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWithAuth />
      <BiodataForm busId={busId} seatIds={seatIds} harga={harga} date={date} />
    </div>
  )
}
