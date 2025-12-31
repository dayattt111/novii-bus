import Link from 'next/link'
import NavbarWithAuth from '@/components/NavbarWithAuth'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWithAuth />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Selamat Datang di Ovii-Bus
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-12">
            Pesan tiket bus Anda dengan mudah dan cepat di seluruh wilayah Sulawesi.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/login"
              className="w-64 bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
            >
              Masuk
            </Link>
            <Link 
              href="/register"
              className="w-64 bg-white text-gray-700 px-8 py-3 rounded-lg text-lg font-medium border border-gray-300 hover:bg-gray-50 transition"
            >
              Daftar
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
