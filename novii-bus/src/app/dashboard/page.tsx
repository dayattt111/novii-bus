import Link from 'next/link'
import { getSession, destroySession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const user = await getSession()
  
  if (!user) {
    redirect('/login')
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
              <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">Pesan</Link>
              <Link href="/booking/history" className="text-gray-700 hover:text-gray-900">Kelola Pesanan</Link>
              <Link href="/profile" className="text-gray-700 hover:text-gray-900">ID</Link>
              <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Pesan Tiket Bus
          </h2>
        </div>

        <form action="/booking/route" method="GET" className="space-y-6 bg-white p-8 rounded-lg shadow-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kota Asal
            </label>
            <select
              name="kotaAsal"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih Kota Asal</option>
              <option value="Makassar">Makassar</option>
              <option value="Toraja">Toraja</option>
              <option value="Palopo">Palopo</option>
              <option value="Sorowako">Sorowako</option>
              <option value="Morowali">Morowali</option>
              <option value="Mamuju">Mamuju</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kota Tujuan
            </label>
            <select
              name="kotaTujuan"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih Kota Tujuan</option>
              <option value="Makassar">Makassar</option>
              <option value="Toraja">Toraja</option>
              <option value="Palopo">Palopo</option>
              <option value="Sorowako">Sorowako</option>
              <option value="Morowali">Morowali</option>
              <option value="Mamuju">Mamuju</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Keberangkatan
            </label>
            <input
              type="date"
              name="tanggal"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Cari Bus
          </button>
        </form>
      </main>
    </div>
  )
}
