'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { getSeatsByBus } from '@/app/actions/booking'

type Seat = {
  id: string
  nomorKursi: string
  harga: number
  isBooked: boolean
}

export default function SeatSelectionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const busId = searchParams.get('busId')
  const date = searchParams.get('date')
  
  const [seats, setSeats] = useState<Seat[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])

  useEffect(() => {
    if (busId) {
      getSeatsByBus(busId).then((data) => {
        setSeats(data as any)
        setLoading(false)
      })
    }
  }, [busId])

  const toggleSeat = (seatId: string, isBooked: boolean) => {
    if (isBooked) return
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId))
    } else {
      // Hanya boleh pilih 1 kursi
      setSelectedSeats([seatId])
    }
  }

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert('Pilih kursi terlebih dahulu')
      return
    }
    
    if (!date) {
      alert('Tanggal keberangkatan tidak ditemukan. Silakan mulai dari dashboard.')
      router.push('/dashboard')
      return
    }
    
    const selectedSeat = seats.find(s => s.id === selectedSeats[0])
    router.push(`/booking/biodata?busId=${busId}&seatId=${selectedSeats[0]}&harga=${selectedSeat?.harga}&date=${date}`)
  }

  const totalHarga = selectedSeats.reduce((sum, seatId) => {
    const seat = seats.find(s => s.id === seatId)
    return sum + (seat?.harga || 0)
  }, 0)

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
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
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-gray-900">Beranda</Link>
          {' / '}
          <Link href="/booking/route" className="hover:text-gray-900">Hasil Pencarian</Link>
          {' / '}
          <span className="text-gray-900 font-medium">Pilih Kursi</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pb-20">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Pilih Kursi
          </h2>
          <p className="text-gray-600">
            Pilih kursi yang Anda inginkan
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Denah Kursi
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left font-medium text-gray-700">Nomor Kursi</th>
                  <th className="py-3 px-4 text-right font-medium text-gray-700">Harga</th>
                </tr>
              </thead>
              <tbody>
                {seats.map((seat) => (
                  <tr key={seat.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <button
                        onClick={() => toggleSeat(seat.id, seat.isBooked)}
                        disabled={seat.isBooked}
                        className={`w-full text-left px-4 py-2 rounded-lg border-2 transition ${
                          seat.isBooked
                            ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                            : selectedSeats.includes(seat.id)
                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {seat.nomorKursi}
                        {seat.isBooked && ' (Sudah dipesan)'}
                      </button>
                    </td>
                    <td className="py-4 px-4 text-right text-blue-600 font-medium">
                      Rp {seat.harga.toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedSeats.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Kursi dipilih:</span>
              <span className="font-semibold text-gray-900">
                {seats.find(s => s.id === selectedSeats[0])?.nomorKursi}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total:</span>
              <span className="text-2xl font-bold text-blue-600">
                Rp {totalHarga.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleContinue}
            disabled={selectedSeats.length === 0}
            className={`px-8 py-3 rounded-lg font-medium transition ${
              selectedSeats.length > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Pesan Sekarang
          </button>
        </div>
      </main>
    </div>
  )
}
