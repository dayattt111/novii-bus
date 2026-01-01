import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import NavbarWithAuth from '@/components/NavbarWithAuth'
import DashboardForm from './DashboardForm'

export default async function DashboardPage() {
  const user = await getSession()
  
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWithAuth />
      <DashboardForm />
    </div>
  )
}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Pesan Tiket Bus
          </h1>
          <p className="text-gray-600 text-lg">Pilih rute dan tanggal perjalanan Anda</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm shadow-xl border-2 border-orange-100 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Kota Asal
                </label>
                <select
                  value={kotaAsal}
                  onChange={(e) => setKotaAsal(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 transition"
                >
                  <option value="">Pilih kota asal</option>
                  {KOTA_OPTIONS.map((kota) => (
                    <option key={kota} value={kota}>
                      {kota}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Kota Tujuan
                </label>
                <select
                  value={kotaTujuan}
                  onChange={(e) => setKotaTujuan(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 transition"
                >
                  <option value="">Pilih kota tujuan</option>
                  {KOTA_OPTIONS.map((kota) => (
                    <option key={kota} value={kota}>
                      {kota}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Tanggal Keberangkatan
              </label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:shadow-lg transition"
            >
              Cari Bus
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
