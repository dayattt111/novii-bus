import Link from 'next/link'
import NavbarWithAuth from '@/components/NavbarWithAuth'
import { getPopularRoutes } from '@/app/actions/booking'

export default async function HomePage() {
  const popularRoutes = await getPopularRoutes()

  return (
    <div className="min-h-screen bg-white">
      <NavbarWithAuth />

      <main>
        {/* Hero Section */}
        <div className="relative bg-orange-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-orange-700 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                JALAN TERUS
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-orange-100 max-w-3xl mx-auto">
                Platform pemesanan tiket bus terpercaya
              </p>
              <p className="text-lg text-orange-100 mb-10 max-w-2xl mx-auto">
                Jelajahi Sulawesi dengan nyaman dan aman
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/login"
                  className="w-56 bg-white text-orange-600 px-10 py-4 text-center font-bold text-lg hover:bg-orange-50 transition-all transform hover:scale-105 shadow-lg"
                >
                  Masuk
                </Link>
                <Link 
                  href="/register"
                  className="w-56 bg-transparent text-white px-10 py-4 text-center font-bold text-lg border-2 border-white hover:bg-white hover:text-orange-600 transition-all transform hover:scale-105"
                >
                  Daftar Sekarang
                </Link>
              </div>
            </div>
          </div>
          
          {/* Wave Separator */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 -mt-24 relative z-10">
            <div className="bg-white p-8 shadow-xl border-t-4 border-orange-600">
              <div className="text-4xl font-bold text-orange-600 mb-2">48+</div>
              <div className="text-gray-600 font-medium">Rute Tersedia</div>
            </div>
            <div className="bg-white p-8 shadow-xl border-t-4 border-teal-500">
              <div className="text-4xl font-bold text-teal-500 mb-2">72+</div>
              <div className="text-gray-600 font-medium">Armada Bus</div>
            </div>
            <div className="bg-white p-8 shadow-xl border-t-4 border-yellow-500">
              <div className="text-4xl font-bold text-yellow-500 mb-2">15</div>
              <div className="text-gray-600 font-medium">Kota Tujuan</div>
            </div>
          </div>

          {/* Popular Routes */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Rute Populer
              </h2>
              <p className="text-lg text-gray-600">Temukan perjalanan terbaik untuk Anda</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularRoutes.map((route, index) => (
                <div
                  key={route.id}
                  className="group bg-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-l-4 border-orange-600"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-orange-100 flex items-center justify-center">
                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1">
                        {route.availableBuses} Bus
                      </span>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center justify-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-gray-900">{route.kotaAsal}</span>
                        <svg className="w-8 h-8 text-orange-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <span className="text-2xl font-bold text-gray-900">{route.kotaTujuan}</span>
                      </div>
                    </div>
                    
                    {route.minPrice > 0 && (
                      <div className="bg-gray-50 -mx-6 px-6 py-4 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Mulai dari</span>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-orange-600">
                              Rp {route.minPrice.toLocaleString('id-ID')}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <Link
                      href={`/dashboard?from=${encodeURIComponent(route.kotaAsal)}&to=${encodeURIComponent(route.kotaTujuan)}`}
                      className="block w-full bg-orange-600 text-white py-3 text-center font-bold hover:bg-orange-700 transition-all transform group-hover:scale-105"
                    >
                      Pesan Sekarang
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {popularRoutes.length === 0 && (
              <p className="text-gray-500 text-center">Belum ada rute tersedia</p>
            )}
          </div>

          {/* Features */}
          <div className="bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-3">
                  Mengapa Memilih Kami
                </h2>
                <p className="text-lg text-gray-600">Perjalanan yang nyaman dimulai dari sini</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="text-center group">
                  <div className="w-20 h-20 bg-orange-600 flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Pemesanan Cepat</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Booking tiket dalam hitungan menit dengan proses yang mudah dan cepat
                  </p>
                </div>
                
                <div className="text-center group">
                  <div className="w-20 h-20 bg-teal-500 flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">E-Tiket Digital</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Tiket digital praktis yang bisa diakses kapan saja di perangkat Anda
                  </p>
                </div>
                
                <div className="text-center group">
                  <div className="w-20 h-20 bg-yellow-500 flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Pembayaran Aman</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Transaksi terlindungi dengan sistem pembayaran yang aman dan terpercaya
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="py-20">
            <div className="bg-orange-600 text-white py-16 px-8 text-center">
              <h2 className="text-4xl font-bold mb-4">Siap Memulai Perjalanan?</h2>
              <p className="text-xl mb-8 text-orange-100">Daftar sekarang dan nikmati kemudahan pemesanan tiket bus</p>
              <Link 
                href="/register"
                className="inline-block bg-white text-orange-600 px-12 py-4 text-lg font-bold hover:bg-orange-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Daftar Gratis
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
