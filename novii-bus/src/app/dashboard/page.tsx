'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-900 rounded"></div>
              <h1 className="text-xl font-bold">Traveloka</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">Pesan</Link>
              <Link href="/booking" className="text-gray-700 hover:text-gray-900">Kelola Pesanan</Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">ID</Link>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </nav>
          </div>
        </div>
      </header>

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
