'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

const KOTA_OPTIONS = ['Makassar', 'Toraja', 'Palopo', 'Sorowako', 'Morowali', 'Mamuju']

export default function DashboardPage() {
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

    // Navigate ke halaman pilih rute
    router.push(`/booking/route?from=${kotaAsal}&to=${kotaTujuan}&date=${tanggal}`)
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🎫</div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-3">
            Pesan Tiket Bus
          </h2>
          <p className="text-gray-600 text-lg">Pilih rute perjalananmu dan mulai petualangan! 🌴</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-orange-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📍 Kota Asal
                </label>
                <select
                  value={kotaAsal}
                  onChange={(e) => setKotaAsal(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 transition"
                >
                  <option value="">Pilih kota asal</option>
                  {KOTA_OPTIONS.map((kota) => (
                    <option key={kota} value={kota}>
                      {kota}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🎯 Kota Tujuan
                </label>
                <select
                  value={kotaTujuan}
                  onChange={(e) => setKotaTujuan(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 transition"
                >
                  <option value="">Pilih kota tujuan</option>
                  {KOTA_OPTIONS.map((kota) => (
                    <option key={kota} value={kota}>
                      {kota}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📅 Tanggal Keberangkatan
              </label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              🔍 Cari Bus Sekarang
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
