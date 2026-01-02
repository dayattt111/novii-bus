'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getRoutesBySearch, getBusesByRoute } from '@/app/actions/booking'

type Route = {
  id: string
  kotaAsal: string
  kotaTujuan: string
  harga: number
}

type Bus = {
  id: string
  tipe: string
  nama: string
  imageUrl?: string | null
  seats: {
    harga: number
  }[]
}

type Props = {
  from: string
  to: string
  date: string
}

// Bus type configurations with facilities
const BUS_TYPES = {
  'Business Class': {
    description: 'Nikmati perjalanan anda dengan kursi empuk, AC, serta Port USB di setiap kursi.',
    facilities: ['Kursi Empuk', 'AC', 'Port USB', 'WiFi'],
    icon: '🚌',
    time: '19:30 WITA',
    basePrice: 200000
  },
  'High Class': {
    description: 'Rasakan kenyamanan kursi empuk dengan daya rebah dalam, jarak kursi yang lebih luas, selimut, bantal, dan Port USB.',
    facilities: ['Kursi Premium', 'AC', 'Selimut', 'Bantal', 'Port USB', 'WiFi'],
    icon: '🚍',
    time: '19:45 WITA',
    basePrice: 250000
  },
  'Sleeper Class': {
    description: 'Rasakan kenyamanan maksimal dengan kabin tidur privat yang dilengkapi selimut, bantal, dan tirai, serta Port USB dan TV pribadi di setiap kapsul.',
    facilities: ['Kabin Tidur Privat', 'Selimut Premium', 'Bantal', 'Tirai', 'Port USB', 'TV Pribadi'],
    icon: '🛏️',
    time: '20:00 WITA',
    basePrice: 350000
  }
}

export default function BusSelectionForm({ from, to, date }: Props) {
  const router = useRouter()
  const [routes, setRoutes] = useState<Route[]>([])
  const [selectedRoute, setSelectedRoute] = useState<string>('')
  const [buses, setBuses] = useState<Bus[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (from && to) {
      getRoutesBySearch(from, to).then((data: any) => {
        setRoutes(data as any)
        if (data.length > 0) {
          setSelectedRoute(data[0].id) // Auto-select first route
        }
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

  const handleSelectBus = (busId: string) => {
    router.push(`/booking/seat?busId=${busId}&date=${date}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Mencari bus tersedia...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-8">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl">🚌</span>
            </div>
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-yellow-500 to-teal-500">
              JALAN TERUS
            </h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Rute Perjalanan</p>
            <p className="font-bold text-lg text-gray-900">{from} → {to}</p>
            <p className="text-sm text-gray-600 mt-1">{new Date(date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Type bus</h2>
          <p className="text-gray-700 font-semibold uppercase tracking-wide">
            PILIH TIPE BUS YANG ANDA INGINKAN
          </p>
        </div>

        {/* Bus Cards */}
        <div className="space-y-4">
          {buses.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-200">
              <div className="text-6xl mb-4">🚌</div>
              <p className="text-gray-600 font-medium">Tidak ada bus tersedia untuk rute ini</p>
              <p className="text-sm text-gray-500 mt-2">Silakan pilih rute atau tanggal lain</p>
            </div>
          ) : (
            buses.map((bus) => {
              const busConfig = BUS_TYPES[bus.tipe as keyof typeof BUS_TYPES] || BUS_TYPES['Business Class']
              const price = bus.seats[0]?.harga || busConfig.basePrice
              
              return (
                <div
                  key={bus.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200 hover:border-orange-400 transition-all hover:shadow-xl"
                >
                  <div className="p-5">
                    <div className="flex gap-4">
                      {/* Bus Image */}
                      <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden relative">
                        {bus.imageUrl ? (
                          <Image
                            src={bus.imageUrl}
                            alt={bus.tipe}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-4xl">
                            {busConfig.icon}
                          </div>
                        )}
                      </div>

                      {/* Bus Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {bus.tipe}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3">
                          {busConfig.description}
                        </p>

                        {/* Time and Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-semibold">{busConfig.time}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-orange-600">
                              Rp. {price.toLocaleString('id-ID')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Select Button */}
                    <button
                      onClick={() => handleSelectBus(bus.id)}
                      className="w-full mt-4 bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors active:scale-95 transform"
                    >
                      Pilih
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="w-full mt-6 bg-white border-2 border-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Kembali
        </button>
      </div>
    </main>
  )
}
