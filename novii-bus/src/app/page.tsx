import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-900 rounded"></div>
              <h1 className="text-xl font-bold">TemanBus</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900">Beranda</Link>
              <Link href="/jadwal" className="text-gray-700 hover:text-gray-900">Jadwal</Link>
              <Link href="/rute" className="text-gray-700 hover:text-gray-900">Rute</Link>
              <Link href="/pesanan" className="text-gray-700 hover:text-gray-900">Pesananku</Link>
              <Link href="/register" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Daftar
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-gray-900">Masuk</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Selamat Datang di TemanBus
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
