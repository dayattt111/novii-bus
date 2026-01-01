'use client'

import Link from 'next/link'

export default function TicketActions() {
  return (
    <div className="mt-8 flex justify-center gap-4">
      <Link
        href="/dashboard"
        className="inline-block bg-gray-100 text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
      >
        Kembali ke Dashboard
      </Link>
      <button
        onClick={() => window.print()}
        className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"
      >
        Cetak E-tiket
      </button>
    </div>
  )
}
