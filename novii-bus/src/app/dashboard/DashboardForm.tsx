'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const KOTA_OPTIONS = ['Makassar', 'Toraja', 'Palopo', 'Sorowako', 'Morowali', 'Mamuju']

export default function DashboardForm() {
  const router = useRouter()
  const [kotaAsal, setKotaAsal] = useState('')
  const [kotaTujuan, setKotaTujuan] = useState('')
  const [tanggal, setTanggal] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!kotaAsal || !kotaTujuan || !tanggal) {
      alert('Semua field harus diisi')
      return
    }

    if (kotaAsal === kotaTujuan) {
      alert('Kota asal dan tujuan tidak boleh sama')
      return
    }

    // Langsung ke pilih bus (gabungkan route & bus)
    router.push(`/booking/bus?from=${kotaAsal}&to=${kotaTujuan}&date=${tanggal}`)
  }

  const handleSwap = () => {
    const temp = kotaAsal
    setKotaAsal(kotaTujuan)
    setKotaTujuan(temp)
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Section */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-block mb-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-100 flex items-center justify-center mx-auto shadow-lg">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
            </svg>
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
          Pesan Tiket Bus Anda
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
          Pilih rute dan tanggal perjalanan untuk menemukan bus terbaik
        </p>
      </div>

      {/* Quick Link to My Tickets - Mobile */}
      <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
        <Link 
          href="/pesanan"
          className="flex items-center justify-between bg-gradient-to-r from-orange-600 to-orange-500 text-white p-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-bold text-base sm:text-lg">Tiket Saya</p>
              <p className="text-xs sm:text-sm text-orange-100">Lihat semua pesanan tiket Anda</p>
            </div>
          </div>
          <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Booking Form */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-2xl border-t-4 border-orange-600 p-4 sm:p-6 md:p-8 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Route Selection */}
            <div className="relative">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 relative">
                {/* Kota Asal */}
                <div className="relative">
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Kota Asal</span>
                  </label>
                  <div className="relative">
                    <select
                      value={kotaAsal}
                      onChange={(e) => setKotaAsal(e.target.value)}
                      required
                      className="w-full px-3 py-3 sm:px-5 sm:py-4 border-2 border-gray-300 focus:outline-none focus:border-orange-500 transition appearance-none bg-white text-base sm:text-lg font-medium"
                    >
                      <option value="">Pilih kota keberangkatan</option>
                      {KOTA_OPTIONS.map((kota) => (
                        <option key={kota} value={kota}>
                          {kota}
                        </option>
                      ))}
                    </select>
                    <svg className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Swap Button */}
                {/* <button
                  type="button"
                  onClick={handleSwap}
                  className="absolute left-1/2 top-[calc(50%+0.5rem)] -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-orange-600 text-white flex items-center justify-center shadow-lg hover:bg-orange-700 transition-all transform hover:scale-110 hidden md:flex"
                  title="Tukar kota"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </button> */}

                {/* Kota Tujuan */}
                <div className="relative">
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Kota Tujuan</span>
                  </label>
                  <div className="relative">
                    <select
                      value={kotaTujuan}
                      onChange={(e) => setKotaTujuan(e.target.value)}
                      required
                      className="w-full px-3 py-3 sm:px-5 sm:py-4 border-2 border-gray-300 focus:outline-none focus:border-teal-500 transition appearance-none bg-white text-base sm:text-lg font-medium"
                    >
                      <option value="">Pilih kota tujuan</option>
                      {KOTA_OPTIONS.map((kota) => (
                        <option key={kota} value={kota}>
                          {kota}
                        </option>
                      ))}
                    </select>
                    <svg className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Tanggal Keberangkatan</span>
              </label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-3 sm:px-5 sm:py-4 border-2 border-gray-300 focus:outline-none focus:border-yellow-500 transition text-base sm:text-lg font-medium"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 sm:pt-4">
              <button
                type="submit"
                className="group w-full bg-orange-600 text-white px-6 py-4 sm:px-8 sm:py-5 text-lg sm:text-xl font-bold hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Cari Bus Tersedia</span>
                </span>
                <div className="absolute inset-0 bg-orange-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </button>
            </div>
          </form>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
          <div className="bg-white p-4 sm:p-6 shadow-md border-l-4 border-orange-600 hover:shadow-lg transition">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Booking Instan</h3>
                <p className="text-xs sm:text-sm text-gray-600">Konfirmasi langsung tanpa menunggu</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 shadow-md border-l-4 border-teal-500 hover:shadow-lg transition">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Pembayaran Aman</h3>
                <p className="text-xs sm:text-sm text-gray-600">Transaksi terlindungi 100%</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Support 24/7</h3>
                <p className="text-xs sm:text-sm text-gray-600">Layanan pelanggan siap membantu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
