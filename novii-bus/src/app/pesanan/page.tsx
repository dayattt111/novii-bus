import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import AppNavbarWithAuth from '@/components/AppNavbarWithAuth'

export default async function PesananPage() {
  const user = await getSession()

  if (!user) {
    redirect('/login')
  }

  // Ambil semua booking user
  const bookings = await prisma.booking.findMany({
    where: { userId: user.id },
    include: {
      bus: {
        include: {
          route: true,
        },
      },
      seat: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <AppNavbarWithAuth />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pesanan Saya</h1>
          <p className="text-gray-600 mt-2">Kelola dan lihat semua pesanan tiket bus Anda</p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Pesanan</h3>
            <p className="text-gray-600 mb-6">Anda belum memiliki pesanan tiket bus</p>
            <Link 
              href="/dashboard" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Pesan Tiket Sekarang
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-gray-500">Kode Booking</span>
                      <span className="text-sm font-mono font-bold text-gray-900">
                        {booking.id.slice(0, 8).toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {booking.bus.route.kotaAsal} → {booking.bus.route.kotaTujuan}
                    </h3>
                    <p className="text-gray-600">{booking.bus.tipe} - {booking.bus.nama}</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      booking.statusPembayaran === 'Lunas' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.statusPembayaran}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Penumpang</p>
                    <p className="font-medium text-gray-900">{booking.namaPenumpang}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">No. Kursi</p>
                    <p className="font-medium text-gray-900">{booking.seat.nomorKursi}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tanggal Berangkat</p>
                    <p className="font-medium text-gray-900">
                      {new Date(booking.tanggalKeberangkatan).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Waktu</p>
                    <p className="font-medium text-gray-900">{booking.waktuKeberangkatan}</p>
                  </div>
                </div>

                <div className="border-t pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Pembayaran</p>
                    <p className="text-2xl font-bold text-blue-600">
                      Rp {booking.totalHarga.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    {booking.statusPembayaran === 'Menunggu Pembayaran' ? (
                      <Link
                        href={`/booking/${booking.id}/payment`}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Bayar Sekarang
                      </Link>
                    ) : (
                      <Link
                        href={`/booking/${booking.id}/ticket`}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Lihat E-Tiket
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
