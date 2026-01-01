import Link from 'next/link'
import NavbarWithAuth from '@/components/NavbarWithAuth'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <NavbarWithAuth />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16 text-center">
          {/* Hero Illustration */}
          <div className="mb-8 relative inline-block">
            <div className="w-32 h-32 mx-auto relative">
              {/* Sun */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400"></div>
              {/* Sun rays */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2">
                <div className="absolute w-1 h-4 bg-orange-400 rounded-full -top-5 left-1/2 -translate-x-1/2"></div>
                <div className="absolute w-1 h-4 bg-orange-400 rounded-full -top-4 -left-4 rotate-45"></div>
                <div className="absolute w-1 h-4 bg-orange-400 rounded-full -top-4 left-12 -rotate-45"></div>
              </div>
              {/* Bus */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg">
                <div className="absolute top-1 left-2 right-2 h-6 grid grid-cols-5 gap-0.5">
                  <div className="bg-orange-200/50 rounded-sm"></div>
                  <div className="bg-orange-200/50 rounded-sm"></div>
                  <div className="bg-orange-200/50 rounded-sm"></div>
                  <div className="bg-orange-200/50 rounded-sm"></div>
                  <div className="bg-orange-200/50 rounded-sm"></div>
                </div>
                <div className="absolute -bottom-1 left-3 w-3 h-3 bg-gray-800 rounded-full"></div>
                <div className="absolute -bottom-1 right-3 w-3 h-3 bg-gray-800 rounded-full"></div>
              </div>
              {/* Wave */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-6 overflow-hidden">
                <div className="w-full h-2 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full"></div>
                <div className="w-full h-2 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full mt-0.5 opacity-60"></div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-blue-500">J</span>
            <span className="text-yellow-500">A</span>
            <span className="text-orange-500">L</span>
            <span className="text-teal-400">A</span>
            <span className="text-red-500">N</span>
            <span className="text-gray-700"> </span>
            <span className="text-orange-600">T</span>
            <span className="text-yellow-500">E</span>
            <span className="text-red-500">R</span>
            <span className="text-blue-500">U</span>
            <span className="text-orange-500">S</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto font-medium">
            Platform pemesanan tiket bus untuk perjalanan Anda di Sulawesi
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link 
              href="/login"
              className="w-48 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full text-center font-semibold hover:shadow-lg transition"
            >
              Masuk
            </Link>
            <Link 
              href="/register"
              className="w-48 bg-white text-gray-900 px-8 py-3 rounded-full text-center font-semibold border-2 border-orange-300 hover:bg-orange-50 transition"
            >
              Daftar
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-orange-100 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pemesanan Cepat</h3>
              <p className="text-gray-600">Proses booking yang sederhana dan efisien dalam hitungan menit</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-blue-100 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">E-Tiket Digital</h3>
              <p className="text-gray-600">Tiket digital yang dapat diakses kapan saja melalui perangkat Anda</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-yellow-100 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pembayaran Aman</h3>
              <p className="text-gray-600">Sistem pembayaran yang terpercaya dan terenkripsi</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
