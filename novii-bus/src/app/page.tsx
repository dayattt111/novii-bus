import Link from 'next/link'
import NavbarWithAuth from '@/components/NavbarWithAuth'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <NavbarWithAuth />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="mb-8 text-6xl">☀️🚌</div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Jalan Terus!
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-4 font-medium">
            Petualangan Dimulai dari Sini ✨
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Pesan tiket bus dengan mudah dan nikmati perjalanan indah di seluruh Sulawesi. Traveling jadi lebih seru! 🌴
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/login"
              className="w-64 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              🚀 Masuk
            </Link>
            <Link 
              href="/register"
              className="w-64 bg-white text-gray-700 px-8 py-4 rounded-2xl text-lg font-semibold border-2 border-orange-200 hover:border-orange-400 hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              ✨ Daftar Sekarang
            </Link>
          </div>

          {/* Features */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-orange-100 hover:shadow-lg transition">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Cepat & Mudah</h3>
              <p className="text-gray-600">Booking tiket hanya dalam hitungan menit</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-orange-100 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🎫</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">E-Tiket Digital</h3>
              <p className="text-gray-600">Tiket langsung di smartphone Anda</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-orange-100 hover:shadow-lg transition">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Pembayaran Aman</h3>
              <p className="text-gray-600">Transfer bank yang terpercaya</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
