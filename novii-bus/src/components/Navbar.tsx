import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-blue-600 rounded"></div>
            <h1 className="text-xl font-bold text-gray-900">Ovii-Bus</h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
              Beranda
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition">
              Pesan Tiket
            </Link>
            <Link href="/pesanan" className="text-gray-700 hover:text-blue-600 transition">
              Pesanan Saya
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-blue-600 transition">
              Masuk
            </Link>
            <Link 
              href="/register" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Daftar
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
