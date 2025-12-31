'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createBooking } from '@/app/actions/booking'
import { useActionState } from 'react'

export default function PaymentPage() {
  const searchParams = useSearchParams()
  
  const busId = searchParams.get('busId') || ''
  const seatId = searchParams.get('seatId') || ''
  const harga = parseInt(searchParams.get('harga') || '0')
  const date = searchParams.get('date') || ''
  const namaPenumpang = searchParams.get('namaPenumpang') || ''
  const noHp = searchParams.get('noHp') || ''
  const naikDi = searchParams.get('naikDi') || ''
  const turunDi = searchParams.get('turunDi') || ''

  const biayaLayanan = 5000
  const totalHarga = harga + biayaLayanan

  async function handlePayment(prevState: any, formData: FormData) {
    // Validasi tanggal
    if (!date || date.trim() === '') {
      return { error: 'Tanggal keberangkatan tidak valid. Silakan kembali ke halaman awal dan pilih tanggal.' }
    }

    // Tambahkan data yang sudah ada
    formData.append('busId', busId)
    formData.append('seatId', seatId)
    formData.append('totalHarga', totalHarga.toString())
    formData.append('biayaLayanan', biayaLayanan.toString())
    formData.append('tanggalKeberangkatan', date)
    formData.append('waktuKeberangkatan', '10:00')
    formData.append('namaPenumpang', namaPenumpang)
    formData.append('noHp', noHp)
    formData.append('naikDi', naikDi)
    formData.append('turunDi', turunDi)
    
    return await createBooking(formData)
  }

  const [state, formAction] = useActionState(handlePayment, null)

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
              <Link href="/" className="text-gray-700 hover:text-gray-900">Hotel</Link>
              <Link href="/" className="text-gray-700 hover:text-gray-900">Pesawat</Link>
              <Link href="/" className="text-gray-700 hover:text-gray-900">Rental Mobil</Link>
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
          <Link href="/booking/route" className="hover:text-gray-900">Pemesanan</Link>
          {' / '}
          <span className="text-gray-900 font-medium">Pembayaran</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pb-20">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Pembayaran
          </h2>
        </div>

        {!date && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg mb-6">
            <p className="font-medium">⚠️ Tanggal keberangkatan tidak ditemukan!</p>
            <p className="text-sm mt-1">Silakan <Link href="/dashboard" className="underline font-medium">kembali ke halaman awal</Link> dan pilih tanggal keberangkatan.</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Pembayaran */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Detail Pemesanan
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nama Penumpang:</span>
                  <span className="font-medium">{namaPenumpang}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">No. Telepon:</span>
                  <span className="font-medium">{noHp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">Rute</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tanggal Keberangkatan:</span>
                  <span className="font-medium">{date ? new Date(date).toLocaleDateString('id-ID') : '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Waktu Keberangkatan:</span>
                  <span className="font-medium">10:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Jumlah Penumpang:</span>
                  <span className="font-medium">1</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Metode Pembayaran
              </h3>

              <form action={formAction} className="space-y-4">
                {state?.error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {state.error}
                  </div>
                )}

                <label className="flex items-center p-4 border-2 border-blue-600 rounded-lg cursor-pointer bg-blue-50">
                  <input
                    type="radio"
                    name="metodePembayaran"
                    value="Kartu Kredit/Debit"
                    defaultChecked
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="ml-3 font-medium text-gray-900">Kartu Kredit/Debit</span>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="metodePembayaran"
                    value="Transfer Bank"
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="ml-3 font-medium text-gray-900">Transfer Bank</span>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="metodePembayaran"
                    value="Dompet Digital"
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="ml-3 font-medium text-gray-900">Dompet Digital</span>
                </label>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition mt-6"
                >
                  Bayar Sekarang
                </button>
              </form>
            </div>
          </div>

          {/* Ringkasan Pembayaran */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Ringkasan Pembayaran
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Harga Tiket</span>
                  <span className="font-medium">Rp {harga.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Biaya Layanan</span>
                  <span className="font-medium">Rp {biayaLayanan.toLocaleString('id-ID')}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">
                    Rp {totalHarga.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Status Pembayaran: <span className="text-orange-600 font-medium">Pending</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
