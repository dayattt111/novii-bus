import Link from 'next/link'
import { getRoutes } from '@/app/actions/booking'

export default async function RouteSelectionPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string; date?: string }>
}) {
  const params = await searchParams
  const { from, to, date } = params
  
  const routes = await getRoutes(from, to)

  if (routes.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-900 rounded"></div>
              <h1 className="text-xl font-bold">SulawesiBus</h1>
            </div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Tidak ada rute tersedia
            </h2>
            <p className="text-gray-600 mb-8">
              Maaf, saat ini tidak ada rute dari {from} ke {to}
            </p>
            <Link 
              href="/dashboard"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Kembali ke Dashboard
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-900 rounded"></div>
              <h1 className="text-xl font-bold">SulawesiBus</h1>
            </div>
            <nav className="flex items-center space-x-8">
              <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">Beranda</Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">Pesan Tiket</Link>
              <Link href="/" className="text-gray-700 hover:text-gray-900">Riwayat Perjalanan</Link>
              <Link href="/" className="text-gray-700 hover:text-gray-900">Profil</Link>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-gray-900">Pesan Tiket</Link>
          {' / '}
          <span className="text-gray-900 font-medium">Pilih Rute</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pb-20">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Pilih Rute
          </h2>
          <p className="text-gray-600">
            Pilih rute yang sesuai dengan jadwal perjalanan Anda.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Rute Tersedia
          </h3>
        </div>

        <div className="space-y-4">
          {routes.map((route, index) => (
            <div key={route.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex items-center justify-between p-6">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Rute {index + 1}
                  </h3>
                  <p className="text-gray-600">
                    {route.kotaAsal} ke {route.kotaTujuan}
                  </p>
                  <div className="mt-2">
                    <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      Rp {route.harga.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
                
                <div className="w-64 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                  <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
              </div>
              
              <div className="px-6 pb-6">
                <Link
                  href={`/booking/bus?routeId=${route.id}&date=${date}`}
                  className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Lanjutkan
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
