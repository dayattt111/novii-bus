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
  const [selectedSeat, setSelectedSeat] = useState<string>('')

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
    
    if (selectedSeat === seatId) {
      setSelectedSeat('')
    } else {
      setSelectedSeat(seatId)
    }
  }

  const handleContinue = () => {
    if (!selectedSeat) {
      alert('Pilih kursi terlebih dahulu')
      return
    }
    
    if (!date) {
      alert('Tanggal keberangkatan tidak ditemukan. Silakan mulai dari dashboard.')
      router.push('/dashboard')
      return
    }
    
    const seat = seats.find(s => s.id === selectedSeat)
    router.push(`/booking/biodata?busId=${busId}&seatId=${selectedSeat}&harga=${seat?.harga}&date=${date}`)
  }

  const getSeatByNumber = (num: string) => {
    return seats.find(s => s.nomorKursi === num)
  }

  const renderSeat = (num: string, position: 'left' | 'right') => {
    const seat = getSeatByNumber(num)
    if (!seat) return <div className="w-14 h-14"></div>

    const isSelected = selectedSeat === seat.id
    const isBooked = seat.isBooked

    return (
      <button
        onClick={() => toggleSeat(seat.id, isBooked)}
        disabled={isBooked}
        className={`w-14 h-14 rounded-lg border-2 font-bold text-sm transition-all ${
          isBooked
            ? 'bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed'
            : isSelected
            ? 'bg-orange-500 border-orange-600 text-white shadow-lg scale-110'
            : 'bg-white border-gray-300 text-gray-700 hover:border-orange-400 hover:bg-orange-50'
        }`}
      >
        {num}
      </button>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat kursi tersedia...</p>
        </div>
      </div>
    )
  }

  const selectedSeatData = seats.find(s => s.id === selectedSeat)

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💺</span>
            </div>
            <h1 className="text-3xl font-black text-gray-900">Pilih Kursi</h1>
          </div>
          <p className="text-gray-600 font-medium">
            Pilih kursi favorit Anda untuk perjalanan yang nyaman
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Bus Layout */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-200">
            <div className="mb-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Layout Bus</h3>
              <p className="text-sm text-gray-600">METRO PERMAI</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-300">
              {/* Driver Section */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-dashed border-gray-300">
                <div className="text-left">
                  <p className="text-xs font-bold text-gray-500 mb-1">PINTU</p>
                  <div className="flex gap-2">
                    <div className="w-10 h-6 bg-gray-400 rounded flex items-center justify-center text-white text-xs font-bold">B</div>
                    <div className="w-10 h-6 bg-gray-400 rounded flex items-center justify-center text-white text-xs font-bold">A</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-12 h-12 border-2 border-gray-400 rounded-full flex items-center justify-center mb-1">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <p className="text-xs font-bold text-gray-500">SOPIR</p>
                </div>
              </div>

              {/* Seats Layout */}
              <div className="space-y-3">
                {/* Row 1 */}
                <div className="flex justify-between gap-4">
                  <div className="flex gap-2">
                    {renderSeat('1', 'left')}
                    {renderSeat('2', 'left')}
                  </div>
                  <div className="flex gap-2">
                    {renderSeat('3', 'right')}
                    {renderSeat('4', 'right')}
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex justify-between gap-4">
                  <div className="flex gap-2">
                    {renderSeat('8', 'left')}
                    {renderSeat('7', 'left')}
                  </div>
                  <div className="flex gap-2">
                    {renderSeat('6', 'right')}
                    {renderSeat('5', 'right')}
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex justify-between gap-4">
                  <div className="flex gap-2">
                    {renderSeat('9', 'left')}
                    {renderSeat('10', 'left')}
                  </div>
                  <div className="flex gap-2">
                    {renderSeat('11', 'right')}
                    {renderSeat('12', 'right')}
                  </div>
                </div>

                {/* Row 4 */}
                <div className="flex justify-between gap-4">
                  <div className="flex gap-2">
                    {renderSeat('16', 'left')}
                    {renderSeat('15', 'left')}
                  </div>
                  <div className="flex gap-2">
                    {renderSeat('14', 'right')}
                    {renderSeat('13', 'right')}
                  </div>
                </div>

                {/* Row 5 */}
                <div className="flex justify-between gap-4">
                  <div className="flex gap-2">
                    {renderSeat('17', 'left')}
                    {renderSeat('18', 'left')}
                  </div>
                  <div className="flex gap-2">
                    {renderSeat('19', 'right')}
                    {renderSeat('20', 'right')}
                  </div>
                </div>

                {/* Row 6 */}
                <div className="flex justify-between gap-4">
                  <div className="flex gap-2">
                    {renderSeat('24', 'left')}
                    {renderSeat('23', 'left')}
                  </div>
                  <div className="flex gap-2">
                    {renderSeat('22', 'right')}
                    {renderSeat('21', 'right')}
                  </div>
                </div>

                {/* Row 7 */}
                <div className="flex justify-between gap-4">
                  <div className="flex gap-2">
                    {renderSeat('25', 'left')}
                    {renderSeat('26', 'left')}
                  </div>
                  <div className="flex gap-2">
                    {renderSeat('27', 'right')}
                    {renderSeat('28', 'right')}
                  </div>
                </div>

                {/* Row 8 - Back Door */}
                <div className="border-t-2 border-dashed border-gray-300 pt-3">
                  <p className="text-xs font-bold text-gray-500 text-center mb-2">PINTU</p>
                  <div className="flex justify-between gap-4">
                    <div className="flex gap-2">
                      {renderSeat('32', 'left')}
                      {renderSeat('31', 'left')}
                    </div>
                    <div className="flex gap-2">
                      {renderSeat('30', 'right')}
                      {renderSeat('29', 'right')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white border-2 border-gray-300 rounded"></div>
                <span className="text-gray-600">Tersedia</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 border-2 border-orange-600 rounded"></div>
                <span className="text-gray-600">Dipilih</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 border-2 border-gray-400 rounded"></div>
                <span className="text-gray-600">Terisi</span>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-orange-200 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Detail Pemesanan</h3>
              
              {selectedSeatData ? (
                <div className="space-y-4">
                  <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Kursi Terpilih</p>
                    <p className="text-3xl font-black text-orange-600">
                      No. {selectedSeatData.nomorKursi}
                    </p>
                  </div>

                  <div className="border-t-2 border-dashed border-gray-300 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Harga Tiket</span>
                      <span className="text-lg font-bold text-gray-900">
                        Rp {selectedSeatData.harga.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleContinue}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all active:scale-95"
                  >
                    Lanjutkan ke Data Pemesan
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">💺</div>
                  <p className="text-gray-500 font-medium">Silakan pilih kursi terlebih dahulu</p>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tips Memilih Kursi
              </h4>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Kursi depan lebih dekat dengan AC</li>
                <li>• Kursi tengah lebih minim guncangan</li>
                <li>• Kursi belakang lebih leluasa untuk rebahan</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.back()}
            className="bg-white border-2 border-gray-300 text-gray-700 font-bold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            ← Kembali Pilih Bus
          </button>
        </div>
      </div>
    </main>
  )
}
