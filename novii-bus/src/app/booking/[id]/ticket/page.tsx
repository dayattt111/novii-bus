import Link from 'next/link'
import Image from 'next/image'
import { getBooking } from '@/app/actions/booking'
import { notFound } from 'next/navigation'
import NavbarWithAuth from '@/components/NavbarWithAuth'
import TicketActions from './TicketActions'

export default async function TicketPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const booking = await getBooking(id)

  if (!booking) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWithAuth />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 pb-20">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            E-tiket Anda
          </h2>
          <p className="text-gray-600">Simpan e-tiket ini untuk perjalanan Anda</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-orange-100">
          {/* Header Tiket */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold">
                  {booking.bus.route.kotaAsal} → {booking.bus.route.kotaTujuan}
                </h3>
                <p className="text-orange-100">E-Tiket Bus</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-orange-100">Tanggal Keberangkatan</p>
                <p className="text-xl font-bold">
                  {new Date(booking.tanggalKeberangkatan).toLocaleDateString('id-ID', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 p-6">
            {/* Detail Penumpang & Perjalanan */}
            <div className="md:col-span-2">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Detail Penumpang
              </h4>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Nama</p>
                  <p className="font-semibold text-gray-900">{booking.namaPenumpang}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nomor Telepon</p>
                  <p className="font-semibold text-gray-900">{booking.noHp}</p>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Detail Perjalanan
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Rute</p>
                  <p className="font-semibold text-gray-900">
                    {booking.bus.route.kotaAsal} → {booking.bus.route.kotaTujuan}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tanggal</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(booking.tanggalKeberangkatan).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Waktu Keberangkatan</p>
                  <p className="font-semibold text-gray-900">{booking.waktuKeberangkatan}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nomor Kursi</p>
                  <p className="font-semibold text-orange-600 text-lg">{booking.seat.nomorKursi}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tipe Bus</p>
                  <p className="font-semibold text-gray-900">{booking.bus.tipe}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nama Bus</p>
                  <p className="font-semibold text-gray-900">{booking.bus.nama}</p>
                </div>
                {booking.naikDi && (
                  <div>
                    <p className="text-sm text-gray-600">Naik Di</p>
                    <p className="font-semibold text-gray-900">{booking.naikDi}</p>
                  </div>
                )}
                {booking.turunDi && (
                  <div>
                    <p className="text-sm text-gray-600">Turun Di</p>
                    <p className="font-semibold text-gray-900">{booking.turunDi}</p>
                  </div>
                )}
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center justify-center border-l border-gray-200 pl-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Kode QR
              </h4>
              {booking.qrCode && (
                <div className="bg-white p-4 rounded-xl border-2 border-orange-200 shadow-sm">
                  <Image
                    src={booking.qrCode}
                    alt="QR Code"
                    width={200}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>
              )}
              <p className="text-xs text-gray-500 mt-3 text-center max-w-[200px]">
                Tunjukkan QR Code ini kepada petugas saat naik bus
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-orange-50 px-6 py-4 border-t border-orange-100">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">Total Pembayaran</p>
                <p className="text-2xl font-bold text-orange-600">
                  Rp {booking.totalHarga.toLocaleString('id-ID')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600">Status Pembayaran</p>
                <p className={`font-semibold text-lg ${
                  booking.statusPembayaran === 'Lunas' 
                    ? 'text-green-600' 
                    : 'text-orange-600'
                }`}>
                  {booking.statusPembayaran}
                </p>
              </div>
            </div>
            <p className="text-xs text-center text-gray-500 pt-3 border-t border-orange-200">
              Simpan e-tiket ini dan tunjukkan QR Code kepada petugas saat naik bus
            </p>
          </div>
        </div>

        <TicketActions />
      </main>
    </div>
  )
}
