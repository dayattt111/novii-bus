'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function BiodataPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const busId = searchParams.get('busId')
  const seatId = searchParams.get('seatId')
  const harga = searchParams.get('harga')
  const date = searchParams.get('date')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const namaPenumpang = formData.get('namaPenumpang')
    const noHp = formData.get('noHp')
    const naikDi = formData.get('naikDi') || ''
    const turunDi = formData.get('turunDi') || ''

    // Navigate ke halaman payment dengan data
    const params = new URLSearchParams({
      busId: busId || '',
      seatId: seatId || '',
      harga: harga || '',
      date: date || '',
      namaPenumpang: namaPenumpang as string,
      noHp: noHp as string,
      naikDi: naikDi as string,
      turunDi: turunDi as string,
    })

    router.push(`/booking/payment?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-900 rounded"></div>
            <h1 className="text-xl font-bold">TemanBus</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Data Penumpang
          </h2>
          <p className="text-gray-600">
            Masukkan data penumpang dengan benar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Penumpang *
            </label>
            <input
              type="text"
              name="namaPenumpang"
              placeholder="Masukkan nama lengkap"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nomor Telepon *
            </label>
            <input
              type="tel"
              name="noHp"
              placeholder="08123456789"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Naik Di (Opsional)
            </label>
            <input
              type="text"
              name="naikDi"
              placeholder="Contoh: Terminal Makassar"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Turun Di (Opsional)
            </label>
            <input
              type="text"
              name="turunDi"
              placeholder="Contoh: Terminal Toraja"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
            >
              Lanjut ke Pembayaran
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
