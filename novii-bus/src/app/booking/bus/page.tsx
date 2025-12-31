'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { getBusesByRoute } from '@/app/actions/booking'
import Navbar from '@/components/Navbar'

type Bus = {
  id: string
  tipe: string
  nama: string
  imageUrl: string | null
  route: {
    kotaAsal: string
    kotaTujuan: string
  }
}

export default function BusSelectionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const routeId = searchParams.get('routeId')
  const date = searchParams.get('date')
  
  const [buses, setBuses] = useState<Bus[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBus, setSelectedBus] = useState<string>('')

  useEffect(() => {
    if (routeId) {
      getBusesByRoute(routeId).then((data) => {
        setBuses(data as any)
        setLoading(false)
      })
    }
  }, [routeId])

  const handleContinue = () => {
    if (!selectedBus) {
      alert('Pilih tipe bus terlebih dahulu')
      return
    }
    
    if (!date) {
      alert('Tanggal keberangkatan tidak ditemukan. Silakan mulai dari dashboard.')
      router.push('/dashboard')
      return
    }
    
    router.push(`/booking/seat?busId=${selectedBus}&date=${date}`)
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-gray-900">Beranda</Link>
          {' / '}
          <Link href="/booking/route" className="hover:text-gray-900">Hasil Pencarian</Link>
          {' / '}
          <span className="text-gray-900 font-medium">Pilih Bus</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pb-20">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Pilih Bus
          </h2>
        </div>

        {!date && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg mb-6">
            <p className="font-medium">⚠️ Tanggal keberangkatan tidak ditemukan!</p>
            <p className="text-sm mt-1">Silakan <Link href="/dashboard" className="underline font-medium">kembali ke halaman awal</Link> dan pilih tanggal keberangkatan.</p>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Pilih Tipe Bus
          </h3>
          
          <div className="flex gap-4">
            {['Ekonomi', 'Eksekutif', 'Sleeper'].map((tipe) => (
              <button
                key={tipe}
                onClick={() => {
                  const bus = buses.find(b => b.tipe === tipe)
                  if (bus) setSelectedBus(bus.id)
                }}
                className={`px-6 py-2 rounded-lg border-2 transition ${
                  buses.find(b => b.id === selectedBus)?.tipe === tipe
                    ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {tipe}
              </button>
            ))}
          </div>
        </div>

        {selectedBus && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <p className="text-gray-600 mb-4">
              Anda memilih: <span className="font-semibold text-gray-900">
                {buses.find(b => b.id === selectedBus)?.tipe}
              </span>
            </p>
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleContinue}
            disabled={!selectedBus}
            className={`px-8 py-3 rounded-lg font-medium transition ${
              selectedBus
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Lanjutkan
          </button>
        </div>
      </main>
    </div>
  )
}
