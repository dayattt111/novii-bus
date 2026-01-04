'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Props = {
  busId: string
  seatIds: string
  harga: string
  date: string
}

export default function BiodataForm({ busId, seatIds, harga, date }: Props) {
  const router = useRouter()
  const seatCount = seatIds ? seatIds.split(',').length : 0

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!date) {
      alert('Tanggal keberangkatan tidak ditemukan. Silakan mulai dari dashboard.')
      router.push('/dashboard')
      return
    }
    
    const formData = new FormData(e.currentTarget)
    const namaPenumpang = formData.get('namaPenumpang')
    const noHp = formData.get('noHp')
    const naikDi = formData.get('naikDi') || ''
    const turunDi = formData.get('turunDi') || ''

    // Navigate ke halaman payment dengan data
    const params = new URLSearchParams({
      busId: busId || '',
      seatIds: seatIds || '',
      harga: harga || '',
      date: date,
      namaPenumpang: namaPenumpang as string,
      noHp: noHp as string,
      naikDi: naikDi as string,
      turunDi: turunDi as string,
    })

    router.push(`/booking/payment?${params.toString()}`)
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Data Penumpang
        </h2>
        <p className="text-gray-600">
          {seatCount > 1 ? `Masukkan data untuk ${seatCount} penumpang` : 'Masukkan data penumpang dengan benar'}
        </p>
      </div>

      {!date && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg mb-6">
          <p className="font-medium">⚠️ Tanggal keberangkatan tidak ditemukan!</p>
          <p className="text-sm mt-1">Silakan <Link href="/dashboard" className="underline font-medium">kembali ke halaman awal</Link> dan pilih tanggal keberangkatan.</p>
        </div>
      )}

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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Naik Di (Opsional)
          </label>
          <input
            type="text"
            name="naikDi"
            placeholder="Terminal keberangkatan"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Turun Di (Opsional)
          </label>
          <input
            type="text"
            name="turunDi"
            placeholder="Terminal tujuan"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition"
          >
            Kembali
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold hover:shadow-lg transition"
          >
            Lanjut ke Pembayaran
          </button>
        </div>
      </form>
    </main>
  )
}
