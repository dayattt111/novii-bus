import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getBusesByRoute } from '@/app/actions/booking'

export default async function SeatSelectionPage({
  searchParams,
}: {
  searchParams: { routeId?: string; tanggal?: string; tipe?: string }
}) {
  const user = await getSession()
  
  if (!user) {
    redirect('/login')
  }

  const { routeId, tanggal, tipe } = searchParams

  if (!routeId || !tanggal || !tipe) {
    redirect('/dashboard')
  }

  const buses = await getBusesByRoute(routeId)
  const bus = buses.find(b => b.tipe === tipe)

  if (!bus) {
    redirect('/dashboard')
  }

  const seats = bus.seats

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
          <Link href={`/booking/route?kotaAsal=${bus.route.kotaAsal}&kotaTujuan=${bus.route.kotaTujuan}&tanggal=${tanggal}`} className="text-blue-600 hover:underline">
            Pemesanan
          </Link>
          <span className="mx-2">/</span>
          <span>Pilih Kursi</span>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Pilih Kursi
        </h2>
        <p className="text-gray-600 mb-8">
          Pilih kursi yang Anda inginkan
        </p>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Denah Kursi</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-50">Nomor Kursi</th>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-50">Harga</th>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-50">Status</th>
                </tr>
              </thead>
              <tbody>
                {seats.map((seat) => (
                  <tr key={seat.id}>
                    <td className="border border-gray-300 px-4 py-2">{seat.nomorKursi}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Rp {seat.harga.toLocaleString('id-ID')}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {seat.isBooked ? (
                        <span className="text-red-600">Terpesan</span>
                      ) : (
                        <Link
                          href={`/booking/biodata?seatId=${seat.id}&busId=${bus.id}&tanggal=${tanggal}&harga=${seat.harga}`}
                          className="text-blue-600 hover:underline"
                        >
                          Pilih
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-right">
            <Link
              href={`/booking/bus?routeId=${routeId}&tanggal=${tanggal}`}
              className="inline-block bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-300 transition mr-4"
            >
              Kembali
            </Link>
            <button
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Pesan Sekarang
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
