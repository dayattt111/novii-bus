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

    router.push(`/booking/route?from=${kotaAsal}&to=${kotaTujuan}&date=${tanggal}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Pesan Tiket Bus
          </h1>
          <p className="text-gray-600 text-lg">Pilih rute dan tanggal perjalanan Anda</p>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Kota Asal
                </label>
                <select
                  value={kotaAsal}
                  onChange={(e) => setKotaAsal(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-orange-600 transition"
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
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Kota Tujuan
                </label>
                <select
                  value={kotaTujuan}
                  onChange={(e) => setKotaTujuan(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-orange-600 transition"
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
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Tanggal Keberangkatan
              </label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-orange-600 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white px-6 py-3 text-lg font-semibold hover:bg-orange-700 transition"
            >
              Cari Bus
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
