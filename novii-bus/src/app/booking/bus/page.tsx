import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getBusesByRoute } from '@/app/actions/booking'

export default async function BusSelectionPage({
  searchParams,
}: {
  searchParams: { routeId?: string; tanggal?: string }
}) {
  const user = await getSession()
  
  if (!user) {
    redirect('/login')
  }

  const { routeId, tanggal } = searchParams

  if (!routeId || !tanggal) {
    redirect('/dashboard')
  }

  const buses = await getBusesByRoute(routeId)

  const busTypes = Array.from(new Set(buses.map(bus => bus.tipe)))

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
              <Link href="/" className="text-gray-700 hover:text-gray-900">Xperience</Link>
              <Link href="/" className="text-gray-700 hover:text-gray-900">Rental Mobil</Link>
              <Link href="/" className="text-gray-700 hover:text-gray-900">Eats</Link>
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
          <Link href={`/booking/route?kotaAsal=${buses[0]?.route.kotaAsal}&kotaTujuan=${buses[0]?.route.kotaTujuan}&tanggal=${tanggal}`} className="text-blue-600 hover:underline">
            Hasil Pencarian
          </Link>
          <span className="mx-2">/</span>
          <span>Pilih Bus</span>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Pilih Bus
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Pilih Tipe Bus</h3>
        </div>

        {busTypes.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <p className="text-gray-600">Tidak ada bus tersedia untuk rute ini</p>
            <Link href="/dashboard" className="text-blue-600 hover:underline mt-4 inline-block">
              Kembali ke Dashboard
            </Link>
          </div>
        ) : (
          <div className="flex gap-4 mb-8">
            {busTypes.map((type) => (
              <Link
                key={type}
                href={`/booking/seat?routeId=${routeId}&tanggal=${tanggal}&tipe=${type}`}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                {type}
              </Link>
            ))}
          </div>
        )}

        {busTypes.length > 0 && (
          <div className="mt-8 text-right">
            <Link
              href={`/booking/seat?routeId=${routeId}&tanggal=${tanggal}&tipe=${busTypes[0]}`}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Lanjutkan
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
