import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { createBooking } from '@/app/actions/booking'

export default async function BiodataPage({
  searchParams,
}: {
  searchParams: { seatId?: string; busId?: string; tanggal?: string; harga?: string }
}) {
  const user = await getSession()
  
  if (!user) {
    redirect('/login')
  }

  const { seatId, busId, tanggal, harga } = searchParams

  if (!seatId || !busId || !tanggal || !harga) {
    redirect('/dashboard')
  }

  const biayaLayanan = 5000
  const totalHarga = parseInt(harga) + biayaLayanan

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-900 rounded"></div>
              <h1 className="text-xl font-bold">TemanBus</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Isi Biodata Penumpang
        </h2>

        <form action={createBooking} className="bg-white p-8 rounded-lg shadow-sm space-y-6">
          <input type="hidden" name="seatId" value={seatId} />
          <input type="hidden" name="busId" value={busId} />
          <input type="hidden" name="tanggalKeberangkatan" value={tanggal} />
          <input type="hidden" name="waktuKeberangkatan" value="08:00" />
          <input type="hidden" name="totalHarga" value={totalHarga} />
          <input type="hidden" name="biayaLayanan" value={biayaLayanan} />
          <input type="hidden" name="metodePembayaran" value="Kartu Kredit/Debit" />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Penumpang
            </label>
            <input
              type="text"
              name="namaPenumpang"
              required
              defaultValue={user.nama}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              No HP
            </label>
            <input
              type="tel"
              name="noHp"
              required
              placeholder="+628123456789"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Naik di (Opsional)
            </label>
            <input
              type="text"
              name="naikDi"
              placeholder="Terminal/Lokasi penjemputan"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Turun di (Opsional)
            </label>
            <input
              type="text"
              name="turunDi"
              placeholder="Terminal/Lokasi tujuan"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Harga</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Harga Tiket</span>
                <span className="font-medium">Rp {parseInt(harga).toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Biaya Layanan</span>
                <span className="font-medium">Rp {biayaLayanan.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total</span>
                <span>Rp {totalHarga.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Lanjutkan ke Pembayaran
          </button>
        </form>
      </main>
    </div>
  )
}
