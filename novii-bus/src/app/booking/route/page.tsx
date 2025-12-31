import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getRoutes } from '@/app/actions/booking'

export default async function RouteSelectionPage({
  searchParams,
}: {
  searchParams: { kotaAsal?: string; kotaTujuan?: string; tanggal?: string }
}) {
  const user = await getSession()
  
  if (!user) {
    redirect('/login')
  }

  const { kotaAsal, kotaTujuan, tanggal } = searchParams

  if (!kotaAsal || !kotaTujuan || !tanggal) {
    redirect('/dashboard')
  }

  const routes = await getRoutes(kotaAsal, kotaTujuan)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-900 rounded"></div>
              <h1 className="text-xl font-bold">SulawesiBus</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">Beranda</Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">Pesan Tiket</Link>
              <Link href="/booking/history" className="text-gray-700 hover:text-gray-900">Riwayat Perjalanan</Link>
              <Link href="/profile" className="text-gray-700 hover:text-gray-900">Profil</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">
          <Link href="/dashboard" className="text-blue-600 hover:underline">Pesan Tiket</Link>
          <span className="mx-2">/</span>
          <span>Pilih Rute</span>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Pilih Rute
        </h2>
        <p className="text-gray-600 mb-8">
          Pilih rute yang sesuai dengan jadwal perjalanan Anda.
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Rute Tersedia</h3>
        </div>

        {routes.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <p className="text-gray-600">Tidak ada rute tersedia untuk {kotaAsal} ke {kotaTujuan}</p>
            <Link href="/dashboard" className="text-blue-600 hover:underline mt-4 inline-block">
              Kembali ke Dashboard
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {routes.map((route, index) => (
              <div key={route.id} className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    Rute {index + 1}
                  </h4>
                  <p className="text-gray-600">
                    {route.kotaAsal} ke {route.kotaTujuan}
                  </p>
                  <p className="text-xl font-bold text-gray-900 mt-2">
                    Rp {route.harga.toLocaleString('id-ID')}
                  </p>
                </div>
                <div className="w-64 h-40 bg-gray-200 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {routes.length > 0 && (
          <div className="mt-8 text-right">
            <Link
              href={`/booking/bus?routeId=${routes[0].id}&tanggal=${tanggal}`}
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
