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
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-64 h-64 bg-white opacity-20 blur-3xl"></div>
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-yellow-300 opacity-20 blur-3xl"></div>
          </div>
          
          <div className="absolute inset-0 bg-orange-700 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}></div>
          </div>
          
          {/* Floating Bus Icons */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="absolute top-32 left-1/4 w-16 h-16 text-white opacity-10 animate-bounce" style={{ animationDuration: '3s' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
            </svg>
            <svg className="absolute bottom-40 right-1/3 w-12 h-12 text-white opacity-10 animate-pulse" style={{ animationDuration: '4s' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
            </svg>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
            <div className="text-center">
              <div className="inline-block mb-6">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-2 border border-white/20">
                  <div className="w-2 h-2 bg-green-400 animate-pulse"></div>
                  <span className="text-sm font-semibold text-white">Platform Bus Terpercaya di Sulawesi</span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight animate-fade-in">
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
            <div className="bg-white p-8 shadow-xl border-t-4 border-orange-600 hover:shadow-2xl transition-shadow transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl font-bold text-orange-600 mb-2">48+</div>
              <div className="text-gray-600 font-medium">Rute Tersedia</div>
            </div>
            <div className="bg-white p-8 shadow-xl border-t-4 border-teal-500 hover:shadow-2xl transition-shadow transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl font-bold text-teal-500 mb-2">72+</div>
              <div className="text-gray-600 font-medium">Armada Bus</div>
            </div>
            <div className="bg-white p-8 shadow-xl border-t-4 border-yellow-500 hover:shadow-2xl transition-shadow transform hover:-translate-y-2 transition-all duration-300">
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
            <div className="relative bg-orange-600 text-white py-16 px-8 text-center overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 opacity-10 blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-800 opacity-20 blur-3xl"></div>
              
              <div className="relative z-10">
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
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <h3 className="text-white text-2xl font-bold mb-4">JALAN TERUS</h3>
              <p className="text-gray-400 mb-4 max-w-md">
                Platform pemesanan tiket bus terpercaya untuk perjalanan Anda di seluruh Sulawesi. 
                Kami berkomitmen memberikan layanan terbaik untuk kenyamanan perjalanan Anda.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-orange-600 flex items-center justify-center transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-orange-600 flex items-center justify-center transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-orange-600 flex items-center justify-center transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-4">Tautan Cepat</h4>
              <ul className="space-y-2">
                <li><Link href="/login" className="hover:text-orange-500 transition">Masuk</Link></li>
                <li><Link href="/register" className="hover:text-orange-500 transition">Daftar</Link></li>
                <li><Link href="/dashboard" className="hover:text-orange-500 transition">Dashboard</Link></li>
                <li><Link href="/pesanan" className="hover:text-orange-500 transition">Pesanan Saya</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-bold mb-4">Kontak Kami</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@jalanterus.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+62 812-3456-7890</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Makassar, Sulawesi Selatan</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Jalan Terus. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="hover:text-orange-500 transition">Kebijakan Privasi</a>
                <a href="#" className="hover:text-orange-500 transition">Syarat & Ketentuan</a>
                <a href="#" className="hover:text-orange-500 transition">Bantuan</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
