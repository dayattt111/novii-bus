import Link from 'next/link'
import Image from 'next/image'
import { getBooking } from '@/app/actions/booking'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default async function TicketPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const booking = await getBooking(id)

  if (!booking) {
    notFound()
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
              <Link href="/" className="text-gray-700 hover:text-gray-900">Tiket Pesawat</Link>
              <Link href="/" className="text-gray-700 hover:text-gray-900">Hotel</Link>
              <Link href="/" className="text-gray-700 hover:text-gray-900">ID</Link>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-gray-900">Pemesanan</Link>
          {' / '}
          <Link href="/" className="hover:text-gray-900">Tiket Bus</Link>
          {' / '}
          <span className="text-gray-900 font-medium">E-tiket</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pb-20">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            E-tiket
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Tiket */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold">
                  {booking.bus.route.kotaAsal} ke {booking.bus.route.kotaTujuan}
                </h3>
                <p className="text-blue-100">Kode Tiket</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-100">Tanggal</p>
                <p className="text-xl font-bold">
                  {new Date(booking.tanggalKeberangkatan).toLocaleDateString('id-ID')}
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 p-6">
            {/* Detail Penumpang */}
            <div className="md:col-span-2">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Detail Penumpang
              </h4>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Nama</p>
                  <p className="font-medium text-gray-900">{booking.namaPenumpang}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nomor Telepon</p>
                  <p className="font-medium text-gray-900">{booking.noHp}</p>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Detail Perjalanan
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Rute</p>
                  <p className="font-medium text-gray-900">
                    {booking.bus.route.kotaAsal} ke {booking.bus.route.kotaTujuan}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tanggal</p>
                  <p className="font-medium text-gray-900">
                    {new Date(booking.tanggalKeberangkatan).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Waktu</p>
                  <p className="font-medium text-gray-900">{booking.waktuKeberangkatan}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tempat Duduk</p>
                  <p className="font-medium text-gray-900">{booking.seat.nomorKursi}</p>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center justify-center border-l pl-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Kode QR
              </h4>
              {booking.qrCode && (
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <Image
                    src={booking.qrCode}
                    alt="QR Code"
                    width={200}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t">
            <p className="text-xs text-center text-gray-500">
              Tunjukkan tiket ini (QR Code) kepada petugas saat akan naik bus.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/dashboard"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Unduh E-tiket
          </Link>
        </div>
      </main>
    </div>
  )
}
