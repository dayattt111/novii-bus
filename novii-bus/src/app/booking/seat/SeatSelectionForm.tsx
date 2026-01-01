'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSeatsByBus } from '@/app/actions/booking'

type Seat = {
  id: string
  nomorKursi: string
  harga: number
  isBooked: boolean
}

type Props = {
  busId: string
  date: string
}

export default function SeatSelectionForm({ busId, date }: Props) {
  const router = useRouter()
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
    return <div className="flex items-center justify-center py-20">Loading...</div>
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 pb-20">
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
                <tr 
                  key={seat.id}
                  onClick={() => toggleSeat(seat.id, seat.isBooked)}
                  className={`border-b cursor-pointer transition ${
                    seat.isBooked
                      ? 'bg-gray-100 cursor-not-allowed'
                      : selectedSeats.includes(seat.id)
                      ? 'bg-orange-50 hover:bg-orange-100'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div 
                        className={`w-10 h-10 rounded flex items-center justify-center font-semibold ${
                          seat.isBooked
                            ? 'bg-gray-300 text-gray-600'
                            : selectedSeats.includes(seat.id)
                            ? 'bg-orange-500 text-white'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {seat.nomorKursi}
                      </div>
                      {seat.isBooked && (
                        <span className="text-sm text-gray-500">Sudah Terisi</span>
                      )}
                      {selectedSeats.includes(seat.id) && (
                        <span className="text-sm text-orange-600 font-medium">Dipilih</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right font-semibold text-gray-900">
                    Rp {seat.harga.toLocaleString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 sticky bottom-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-600">Total Harga</p>
            <p className="text-2xl font-bold text-gray-900">
              Rp {totalHarga.toLocaleString('id-ID')}
            </p>
          </div>
          <button
            onClick={handleContinue}
            disabled={selectedSeats.length === 0}
            className={`px-8 py-3 rounded-full font-semibold transition ${
              selectedSeats.length > 0
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </main>
  )
}
