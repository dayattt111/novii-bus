import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getBooking } from '@/app/actions/booking'
import Image from 'next/image'

export default async function TicketPage({
  params,
}: {
  params: { id: string }
}) {
  const user = await getSession()
  
  if (!user) {
    redirect('/login')
  }

  const booking = await getBooking(params.id)

  if (!booking) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-900 rounded"></div>
              <h1 className="text-xl font-bold">Traveloka</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">Tiket Bus</Link>
              <Link href="/" className="text-gray-700 hover:text-gray-900">Tiket Pesawat</Link>
              <Link href="/" className="text-gray-700 hover:text-gray-900">Hotel</Link>
              <Link href="/" className="text-gray-700 hover:text-gray-900">Xperience</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">
          <Link href="/booking/history" className="text-blue-600 hover:underline">Pemesanan</Link>
          <span className="mx-2">/</span>
          <Link href="/dashboard" className="text-blue-600 hover:underline">Tiket Bus</Link>
          <span className="mx-2">/</span>
          <span>E-tiket</span>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          E-tiket
        </h2>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          {/* Header Ticket */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {booking.bus.route.kotaAsal} ke {booking.bus.route.kotaTujuan}
              </h3>
              <p className="text-gray-600">Tiket Bus</p>
              <p className="text-sm text-gray-500">Lihat Detail</p>
            </div>
            <div className="w-48 h-32 bg-gray-200 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
            </div>
          </div>

          {/* Detail Penumpang */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Detail Penumpang</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Nama</p>
                <p className="font-medium">{booking.namaPenumpang}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Nomor Telepon</p>
                <p className="font-medium">{booking.noHp}</p>
              </div>
            </div>
          </div>

          {/* Detail Perjalanan */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Detail Perjalanan</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Rute</p>
                <p className="font-medium">{booking.bus.route.kotaAsal} ke {booking.bus.route.kotaTujuan}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tanggal</p>
                <p className="font-medium">
                  {new Date(booking.tanggalKeberangkatan).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Waktu</p>
                <p className="font-medium">{booking.waktuKeberangkatan}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tempat Duduk</p>
                <p className="font-medium">{booking.seat.nomorKursi}</p>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="border-t pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Kode QR</h4>
            <div className="flex justify-center">
              {booking.qrCode && (
                <Image 
                  src={booking.qrCode} 
                  alt="QR Code" 
                  width={200}
                  height={200}
                  className="border border-gray-300 p-4 rounded-lg"
                />
              )}
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              Tunjukkan kode QR ini kepada petugas saat naik bus
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-4 justify-center">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Unduh E-tiket
            </button>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
