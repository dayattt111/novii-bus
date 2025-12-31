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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Pesan Tiket Bus
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kota Asal
            </label>
            <select
              value={kotaAsal}
              onChange={(e) => setKotaAsal(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kota Tujuan
            </label>
            <select
              value={kotaTujuan}
              onChange={(e) => setKotaTujuan(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih kota tujuan</option>
              {KOTA_OPTIONS.map((kota) => (
                <option key={kota} value={kota}>
                  {kota}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Keberangkatan
            </label>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
          >
            Cari Bus
          </button>
        </form>
      </main>
    </div>
  )
}
