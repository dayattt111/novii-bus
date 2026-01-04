import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import NavbarWithAuth from '@/components/NavbarWithAuth'
import PaymentForm from './PaymentForm'

type Props = {
  searchParams: Promise<{
    busId?: string
    seatId?: string
    seatIds?: string
    harga?: string
    date?: string
    namaPenumpang?: string
    noHp?: string
    naikDi?: string
    turunDi?: string
  }>
}

export default async function PaymentPage({ searchParams }: Props) {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  const params = await searchParams
  const busId = params.busId || ''
  const seatId = params.seatId || ''
  const seatIds = params.seatIds || seatId // Support both single and multiple seats
  const harga = parseInt(params.harga || '0')
  const date = params.date || ''
  const namaPenumpang = params.namaPenumpang || ''
  const noHp = params.noHp || ''
  const naikDi = params.naikDi || ''
  const turunDi = params.turunDi || ''

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWithAuth />
      <PaymentForm 
        busId={busId}
        seatIds={seatIds}
        harga={harga}
        date={date}
        namaPenumpang={namaPenumpang}
        noHp={noHp}
        naikDi={naikDi}
        turunDi={turunDi}
      />
    </div>
  )
}
