import Link from 'next/link'
import Image from 'next/image'
import { getBooking, updatePaymentStatus } from '@/app/actions/booking'
import { notFound } from 'next/navigation'

export default async function PaymentPage({ params }: { params: { id: string } }) {
  const booking = await getBooking(params.id)

  if (!booking) {
    notFound()
  }

  async function handlePayment() {
    'use server'
    await updatePaymentStatus(params.id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-900 rounded"></div>
              <h1 className="text-xl font-bold">Traveloka</h1>
            </div>
            <nav className="flex items-center space-x-8">
              <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">Tiket Bus</Link>
              <Link href="/" className="text-gray-700 hover:text-gray-900">Hotel</Link>
              <Link href="/" className="text-gray-700 hover:text-gray-900">Pesawat</Link>
              <Link href="/" className="text-gray-700 hover:text-gray-900">Rental Mobil</Link>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-gray-900">Beranda</Link>
          {' / '}
          <Link href="/booking/route" className="hover:text-gray-900">Pemesanan</Link>
          {' / '}
          <span className="text-gray-900 font-medium">Pembayaran</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 pb-20">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Pembayaran
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <div className="inline-block p-3 bg-orange-100 rounded-full mb-4">
              <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Menunggu Pembayaran
            </h3>
            <p className="text-gray-600">
              Silakan selesaikan pembayaran Anda
            </p>
          </div>

          <div className="border-t border-b py-6 mb-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Nama Penumpang</span>
              <span className="font-medium">{booking.namaPenumpang}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">No. Telepon</span>
              <span className="font-medium">{booking.noHp}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Rute</span>
              <span className="font-medium">
                {booking.bus.route.kotaAsal} → {booking.bus.route.kotaTujuan}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tanggal</span>
              <span className="font-medium">
                {new Date(booking.tanggalKeberangkatan).toLocaleDateString('id-ID')}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Waktu</span>
              <span className="font-medium">{booking.waktuKeberangkatan}</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Harga Tiket</span>
              <span>Rp {(booking.totalHarga - booking.biayaLayanan).toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Biaya Layanan</span>
              <span>Rp {booking.biayaLayanan.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold text-blue-600">
                Rp {booking.totalHarga.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          <form action={handlePayment}>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
            >
              Bayar Sekarang
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-4">
            Status Pembayaran: <span className="text-orange-600 font-medium">Pending</span>
          </p>
        </div>
      </main>
    </div>
  )
}
