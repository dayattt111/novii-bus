import Link from 'next/link'
import NavbarWithAuth from '@/components/NavbarWithAuth'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarWithAuth />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Jalan Terus
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Platform pemesanan tiket bus terpercaya untuk perjalanan Anda di Sulawesi
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link 
              href="/login"
              className="w-48 bg-orange-600 text-white px-8 py-3 text-center font-semibold hover:bg-orange-700 transition"
            >
              Masuk
            </Link>
            <Link 
              href="/register"
              className="w-48 bg-white text-gray-900 px-8 py-3 text-center font-semibold border-2 border-gray-900 hover:bg-gray-50 transition"
            >
              Daftar
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 p-8 border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 flex items-center justify-center mb-4 mx-auto font-bold text-xl">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pemesanan Cepat</h3>
              <p className="text-gray-600">Proses booking yang sederhana dan efisien dalam hitungan menit</p>
            </div>
            <div className="bg-gray-50 p-8 border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 flex items-center justify-center mb-4 mx-auto font-bold text-xl">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">E-Tiket Digital</h3>
              <p className="text-gray-600">Tiket digital yang dapat diakses kapan saja melalui perangkat Anda</p>
            </div>
            <div className="bg-gray-50 p-8 border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 flex items-center justify-center mb-4 mx-auto font-bold text-xl">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pembayaran Aman</h3>
              <p className="text-gray-600">Sistem pembayaran yang terpercaya dan terenkripsi</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
