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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <AppNavbarWithAuth />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-600 flex items-center justify-center shadow-lg flex-shrink-0">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Pesanan Saya</h1>
              <p className="text-gray-600 text-base sm:text-lg mt-1">Kelola dan lihat semua pesanan tiket bus Anda</p>
            </div>
          </div>
          
          {/* Stats */}
          {bookings.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 shadow-md border-l-4 border-orange-600">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Pesanan</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">{bookings.length}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 flex items-center justify-center flex-shrink-0 ml-3">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 shadow-md border-l-4 border-green-600">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Sudah Lunas</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {bookings.filter(b => b.statusPembayaran === 'Lunas').length}
                    </p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 flex items-center justify-center flex-shrink-0 ml-3">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 shadow-md border-l-4 border-yellow-600">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Menunggu Bayar</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {bookings.filter(b => b.statusPembayaran === 'Menunggu Pembayaran').length}
                    </p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 flex items-center justify-center flex-shrink-0 ml-3">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white shadow-xl p-16 text-center border-t-4 border-orange-600">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-yellow-100 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-16 h-16 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Belum Ada Pesanan</h3>
              <p className="text-gray-600 mb-8 text-lg">Mulai perjalanan Anda dengan memesan tiket bus sekarang</p>
              <Link 
                href="/dashboard" 
                className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 font-bold text-lg hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
                </svg>
                Pesan Tiket Sekarang
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-orange-600">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-6 pb-4 border-b-2 border-gray-100 gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                        <div className="bg-orange-100 px-2 sm:px-3 py-1">
                          <span className="text-xs font-bold text-orange-600">KODE BOOKING</span>
                        </div>
                        <span className="text-base sm:text-lg font-mono font-bold text-gray-900">
                          {booking.id.slice(0, 8).toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className="break-words">{booking.bus.route.kotaAsal}</span>
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <span className="break-words">{booking.bus.route.kotaTujuan}</span>
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base text-gray-600">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
                        </svg>
                        <span className="font-semibold">{booking.bus.nama}</span>
                        <span>•</span>
                        <span>{booking.bus.tipe}</span>
                      </div>
                    </div>
                    <div className="text-left sm:text-right flex-shrink-0">
                      <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold shadow-md ${
                        booking.statusPembayaran === 'Lunas' 
                          ? 'bg-green-600 text-white' 
                          : 'bg-yellow-500 text-white'
                      }`}>
                        {booking.statusPembayaran === 'Lunas' ? (
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        <span className="whitespace-nowrap">{booking.statusPembayaran}</span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                    <div className="bg-gray-50 p-3 sm:p-4">
                      <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <p className="text-xs font-bold text-gray-600 uppercase">Penumpang</p>
                      </div>
                      <p className="font-bold text-gray-900 text-sm sm:text-base break-words">{booking.namaPenumpang}</p>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4">
                      <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                        </svg>
                        <p className="text-xs font-bold text-gray-600 uppercase">Kursi</p>
                      </div>
                      <p className="font-bold text-gray-900 text-sm sm:text-base">{booking.seat.nomorKursi}</p>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4">
                      <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs font-bold text-gray-600 uppercase">Tanggal</p>
                      </div>
                      <p className="font-bold text-gray-900 text-sm sm:text-base">
                        {new Date(booking.tanggalKeberangkatan).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4">
                      <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs font-bold text-gray-600 uppercase">Waktu</p>
                      </div>
                      <p className="font-bold text-gray-900 text-sm sm:text-base">{booking.waktuKeberangkatan}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 -mx-6 -mb-6 px-4 sm:px-6 py-4 sm:py-5 border-t-2 border-orange-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-gray-600 mb-1">Total Pembayaran</p>
                        <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                          Rp {booking.totalHarga.toLocaleString('id-ID')}
                        </p>
                      </div>
                      <div className="w-full sm:w-auto">
                        {booking.statusPembayaran === 'Menunggu Pembayaran' ? (
                          <Link
                            href={`/booking/${booking.id}/payment`}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 font-bold text-sm sm:text-base hover:bg-orange-700 transition-all transform hover:scale-105 shadow-md"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <span>Bayar Sekarang</span>
                          </Link>
                        ) : (
                          <Link
                            href={`/booking/${booking.id}/ticket`}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 font-bold text-sm sm:text-base hover:bg-green-700 transition-all transform hover:scale-105 shadow-md"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                            <span>Lihat E-Tiket</span>
                          </Link>
                        )}
                      </div>
                    </div>
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
