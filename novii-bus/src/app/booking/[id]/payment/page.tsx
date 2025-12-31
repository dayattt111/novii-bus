import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getBooking, updatePaymentStatus } from '@/app/actions/booking'

export default async function PaymentPage({
  params,
}: {
  params: { id: string }
}) {
  const user = await getSession()
  
  if (!user) {
    redirect('/login')
  }

  const booking = await getBooking(params.id)

  if (!booking) {
    redirect('/dashboard')
  }

  async function handlePayment() {
    'use server'
    await updatePaymentStatus(params.id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-900 rounded"></div>
              <h1 className="text-xl font-bold">Traveloka</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">Tiket Bus</Link>
              <Link href="/" className="text-gray-700 hover:text-gray-900">Tiket Pesawat</Link>
              <Link href="/" className="text-gray-700 hover:text-gray-900">Hotel</Link>
              <Link href="/" className="text-gray-700 hover:text-gray-900">Pesawat</Link>
              <Link href="/" className="text-gray-700 hover:text-gray-900">Rental Mobil</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">
          <Link href="/dashboard" className="text-blue-600 hover:underline">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href="/booking/history" className="text-blue-600 hover:underline">Pemesanan</Link>
          <span className="mx-2">/</span>
          <span>Pembayaran</span>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Pembayaran
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Detail Pemesanan */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Detail Pemesanan</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Nama Penumpang</span>
                <span className="font-medium">{booking.namaPenumpang}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">No. HP</span>
                <span className="font-medium">{booking.noHp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email</span>
                <span className="font-medium">{booking.user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rute</span>
                <span className="font-medium">{booking.bus.route.kotaAsal} - {booking.bus.route.kotaTujuan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tanggal Keberangkatan</span>
                <span className="font-medium">
                  {new Date(booking.tanggalKeberangkatan).toLocaleDateString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Waktu Keberangkatan</span>
                <span className="font-medium">{booking.waktuKeberangkatan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Jumlah Penumpang</span>
                <span className="font-medium">1</span>
              </div>
            </div>
          </div>

          {/* Metode Pembayaran */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Metode Pembayaran</h3>
            
            <form action={handlePayment} className="space-y-4">
              <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="payment" value="credit" defaultChecked className="mr-3" />
                <span>Kartu Kredit/Debit</span>
              </label>

              <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="payment" value="transfer" className="mr-3" />
                <span>Transfer Bank</span>
              </label>

              <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="payment" value="ewallet" className="mr-3" />
                <span>Dompet Digital</span>
              </label>

              <div className="border-t pt-6 mt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Pembayaran</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Harga Tiket</span>
                    <span>Rp {(booking.totalHarga - booking.biayaLayanan).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Biaya Layanan</span>
                    <span>Rp {booking.biayaLayanan.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                    <span>Total</span>
                    <span>Rp {booking.totalHarga.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Bayar Sekarang
              </button>

              <p className="text-xs text-center text-gray-500">
                Status Pembayaran: {booking.statusPembayaran === 'pending' ? 'Pending' : 'Lunas'}
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
