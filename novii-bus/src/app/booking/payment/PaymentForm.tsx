'use client'

import Link from 'next/link'
import { createBooking } from '@/app/actions/booking'
import { useActionState, useState } from 'react'

type Props = {
  busId: string
  seatIds: string
  harga: number
  date: string
  namaPenumpang: string
  noHp: string
  naikDi: string
  turunDi: string
}

export default function PaymentForm({ 
  busId, 
  seatIds, 
  harga, 
  date, 
  namaPenumpang, 
  noHp, 
  naikDi, 
  turunDi 
}: Props) {
  const seatCount = seatIds ? seatIds.split(',').length : 0
  // Konversi date ke format DD-MM-YYYY
  let validDate = ''
  if (date) {
    try {
      // Cek apakah sudah format YYYY-MM-DD (dari input type="date")
      if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        const [year, month, day] = date.split('-')
        validDate = `${day}-${month}-${year}`
      } 
      // Cek apakah format DD/MM/YYYY (dari toLocaleDateString)
      else if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) {
        const [day, month, year] = date.split('/')
        validDate = `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`
      }
      // Sudah format DD-MM-YYYY
      else if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(date)) {
        const [day, month, year] = date.split('-')
        validDate = `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`
      }
      // Coba parse sebagai Date object
      else {
        const dateObj = new Date(date)
        if (!isNaN(dateObj.getTime())) {
          const day = String(dateObj.getDate()).padStart(2, '0')
          const month = String(dateObj.getMonth() + 1).padStart(2, '0')
          const year = dateObj.getFullYear()
          validDate = `${day}-${month}-${year}`
        }
      }
    } catch (e) {
      console.error('Gagal convert date:', e)
      validDate = date
    }
  }

  const biayaLayanan = 5000
  const totalHarga = harga + biayaLayanan

  const [selectedMethod, setSelectedMethod] = useState<string>('Kartu Kredit/Debit')

  async function handlePayment(prevState: any, formData: FormData) {
    // Validasi tanggal dari formData
    const tanggalFromForm = formData.get('tanggalKeberangkatan') as string
    
    if (!tanggalFromForm || tanggalFromForm === '' || tanggalFromForm === 'null' || tanggalFromForm === 'undefined') {
      return { error: 'Tanggal keberangkatan tidak valid. Silakan kembali ke halaman awal dan pilih tanggal.' }
    }
    
    return await createBooking(formData)
  }

  const [state, formAction] = useActionState(handlePayment, null)

  return (
    <main className="max-w-4xl mx-auto px-4 pb-20 py-8">
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
                <span className="text-gray-600">Tanggal Keberangkatan:</span>
                <span className="font-medium">{date ? new Date(date).toLocaleDateString('id-ID') : '-'}</span>
              </div>
              {naikDi && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Naik Di:</span>
                  <span className="font-medium">{naikDi}</span>
                </div>
              )}
              {turunDi && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Turun Di:</span>
                  <span className="font-medium">{turunDi}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Metode Pembayaran
            </h3>

            <form action={formAction} className="space-y-4">
              {/* Hidden inputs untuk data booking */}
              <input type="hidden" name="busId" value={busId} />
              <input type="hidden" name="seatIds" value={seatIds} />
              <input type="hidden" name="totalHarga" value={totalHarga} />
              <input type="hidden" name="biayaLayanan" value={biayaLayanan} />
              <input type="hidden" name="tanggalKeberangkatan" value={validDate} />
              <input type="hidden" name="waktuKeberangkatan" value="10:00" />
              <input type="hidden" name="namaPenumpang" value={namaPenumpang} />
              <input type="hidden" name="noHp" value={noHp} />
              <input type="hidden" name="naikDi" value={naikDi} />
              <input type="hidden" name="turunDi" value={turunDi} />

              {state?.error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {state.error}
                </div>
              )}

              <label className="flex items-center p-4 border-2 border-orange-500 rounded-lg cursor-pointer bg-orange-50">
                <input
                  type="radio"
                  name="metodePembayaran"
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="w-5 h-5 text-orange-600"
                />
                <span className="ml-3 font-medium text-gray-900">Kartu Kredit/Debit</span>
              </label>

              {selectedMethod === 'Kartu Kredit/Debit' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                  <p className="font-semibold text-gray-900">Informasi Pembayaran Kartu</p>
                  <p className="text-sm text-gray-700">Silakan masukkan detail kartu kredit/debit Anda:</p>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">• Visa, Mastercard, JCB diterima</p>
                    <p className="text-gray-600">• Transaksi aman dengan enkripsi SSL</p>
                    <p className="text-gray-600">• Pembayaran akan diproses setelah klik "Bayar Sekarang"</p>
                  </div>
                </div>
              )}

              <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="metodePembayaran"
                  value="Transfer Bank"
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="w-5 h-5 text-orange-600"
                />
                <span className="ml-3 font-medium text-gray-900">Transfer Bank</span>
              </label>

              {selectedMethod === 'Transfer Bank' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
                  <p className="font-semibold text-gray-900">Transfer ke Rekening Berikut:</p>
                  <div className="bg-white rounded-lg p-4 space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Bank BCA</p>
                      <p className="text-lg font-bold text-gray-900">1234567890</p>
                      <p className="text-sm text-gray-700">a.n. PT Jalan Terus</p>
                    </div>
                    <div className="border-t pt-3">
                      <p className="text-sm text-gray-600">Bank Mandiri</p>
                      <p className="text-lg font-bold text-gray-900">9876543210</p>
                      <p className="text-sm text-gray-700">a.n. PT Jalan Terus</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    💡 Transfer tepat <span className="font-bold text-orange-600">Rp {totalHarga.toLocaleString('id-ID')}</span> agar mudah diverifikasi
                  </p>
                </div>
              )}

              <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="metodePembayaran"
                  value="Dompet Digital"
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="w-5 h-5 text-orange-600"
                />
                <span className="ml-3 font-medium text-gray-900">Dompet Digital (QRIS)</span>
              </label>

              {selectedMethod === 'Dompet Digital' && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-3">Scan QR Code untuk Bayar</p>
                  <div className="bg-white rounded-lg p-6 flex flex-col items-center">
                    <div className="w-48 h-48 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        {/* <div className="text-6xl mb-2">📱</div> */}
                        <p className="text-sm font-medium text-gray-700">QR Code QRIS</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 text-center mb-2">
                      Silakan scan QR Code di atas menggunakan aplikasi:
                    </p>
                    <p className="text-xs text-gray-600 text-center">
                      GoPay • OVO • Dana • ShopeePay • LinkAja
                    </p>
                    <div className="mt-4 text-center">
                      <p className="text-lg font-bold text-orange-600">
                        Rp {totalHarga.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition mt-6"
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
                <span className="text-gray-600">Harga Tiket ({seatCount} kursi)</span>
                <span className="font-medium">Rp {harga.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Biaya Layanan</span>
                <span className="font-medium">Rp {biayaLayanan.toLocaleString('id-ID')}</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-orange-600">
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
  )
}
