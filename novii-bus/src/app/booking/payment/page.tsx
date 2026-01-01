'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createBooking } from '@/app/actions/booking'
import { useActionState } from 'react'
import NavbarWithAuth from '@/components/NavbarWithAuth'

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

  // Debug: Log semua params
  console.log('Payment Page Debug:', {
    busId,
    seatId,
    harga,
    date,
    namaPenumpang,
    noHp,
    dateFromParams: searchParams.get('date'),
    allParams: Object.fromEntries(searchParams.entries())
  })

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
      console.log('Date dikonversi dari', date, 'ke', validDate)
    } catch (e) {
      console.error('Gagal convert date:', e)
      validDate = date
    }
  }

  const biayaLayanan = 5000
  const totalHarga = harga + biayaLayanan

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
    <div className="min-h-screen bg-gray-50">
      <NavbarWithAuth />

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
                {/* Hidden inputs untuk data booking */}
                <input type="hidden" name="busId" value={busId} />
                <input type="hidden" name="seatId" value={seatId} />
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
