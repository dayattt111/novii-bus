'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getRoutesBySearch, getBusesByRoute } from '@/app/actions/booking'
import NavbarWithAuth from '@/components/NavbarWithAuth'

type Route = {
  id: string
  kotaAsal: string
  kotaTujuan: string
  harga: number
  durasi: string
}

type Bus = {
  id: string
  tipe: string
  nama: string
}

export default function BusSelectionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const date = searchParams.get('date')
  
  const [routes, setRoutes] = useState<Route[]>([])
  const [selectedRoute, setSelectedRoute] = useState<string>('')
  const [buses, setBuses] = useState<Bus[]>([])
  const [selectedBus, setSelectedBus] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (from && to) {
      getRoutesBySearch(from, to).then((data: any) => {
        setRoutes(data as any)
        setLoading(false)
      })
    }
  }, [from, to])

  useEffect(() => {
    if (selectedRoute) {
      getBusesByRoute(selectedRoute).then((data: any) => {
        setBuses(data as any)
      })
    }
  }, [selectedRoute])

  const handleContinue = () => {
    if (!selectedRoute) {
      alert('Pilih rute terlebih dahulu')
      return
    }
    if (!selectedBus) {
      alert('Pilih tipe bus terlebih dahulu')
      return
    }
    
    router.push(`/booking/seat?busId=${selectedBus}&date=${date}`)
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWithAuth />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Pilih Rute & Bus
          </h2>
          <p className="text-gray-600">{from} → {to} • {date}</p>
        </div>

        {/* Step 1: Pilih Rute */}
        <div className="bg-white rounded-2xl border-2 border-orange-100 p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Pilih Rute</h3>
          {routes.length === 0 ? (
            <p className="text-gray-600">Tidak ada rute tersedia untuk {from} → {to}</p>
          ) : (
            <div className="space-y-3">
              {routes.map((route) => (
                <button
                  key={route.id}
                  onClick={() => setSelectedRoute(route.id)}
                  className={`w-full text-left p-4 border-2 rounded-lg transition ${
                    selectedRoute === route.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {route.kotaAsal} → {route.kotaTujuan}
                      </div>
                      <div className="text-sm text-gray-600">Durasi: {route.durasi}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-orange-600">
                        Rp {route.harga.toLocaleString('id-ID')}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Step 2: Pilih Tipe Bus */}
        {selectedRoute && buses.length > 0 && (
          <div className="bg-white rounded-2xl border-2 border-orange-100 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Pilih Tipe Bus</h3>
            <div className="grid grid-cols-3 gap-4">
              {buses.map((bus) => (
                <button
                  key={bus.id}
                  onClick={() => setSelectedBus(bus.id)}
                  className={`p-4 border-2 rounded-lg transition ${
                    selectedBus === bus.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{bus.tipe}</div>
                  <div className="text-sm text-gray-600">{bus.nama}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleContinue}
            disabled={!selectedBus}
            className={`px-8 py-3 rounded-full font-semibold transition ${
              selectedBus
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Lanjutkan ke Pilih Kursi
          </button>
        </div>
      </main>
    </div>
  )
}
