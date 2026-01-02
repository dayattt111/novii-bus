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
    basePrice: 200000,
    defaultImage: '/image/bus1.jpg',
    color: 'orange',
    badge: 'Ekonomis'
  },
  'High Class': {
    description: 'Rasakan kenyamanan kursi empuk dengan daya rebah dalam, jarak kursi yang lebih luas, selimut, bantal, dan Port USB.',
    facilities: ['Kursi Premium', 'AC', 'Selimut', 'Bantal', 'Port USB', 'WiFi'],
    icon: '🚍',
    time: '19:45 WITA',
    basePrice: 250000,
    defaultImage: '/image/bus2.jpg',
    color: 'blue',
    badge: 'Populer'
  },
  'Sleeper Class': {
    description: 'Rasakan kenyamanan maksimal dengan kabin tidur privat yang dilengkapi selimut, bantal, dan tirai, serta Port USB dan TV pribadi di setiap kapsul.',
    facilities: ['Kabin Tidur Privat', 'Selimut', 'Bantal', 'Tirai', 'Port USB', 'TV Pribadi'],
    icon: '🛏️',
    time: '20:00 WITA',
    basePrice: 350000,
    defaultImage: '/image/bus3.jpg',
    color: 'purple',
    badge: 'Premium'
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
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl animate-pulse">
              <span className="text-4xl">🚌</span>
            </div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-yellow-500 to-teal-500">
              JALAN TERUS
            </h1>
          </div>

          <div className="bg-white rounded-2xl shadow-md border-2 border-orange-200 p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-500">Rute Perjalanan</p>
              <div className="flex items-center gap-2 text-sm text-orange-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-semibold">{new Date(date).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{from}</p>
                <p className="text-xs text-gray-500 uppercase">Keberangkatan</p>
              </div>
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{to}</p>
                <p className="text-xs text-gray-500 uppercase">Tujuan</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Pilih Type Bus</h2>
            <p className="text-gray-600 font-medium">
              Bandingkan dan pilih tipe bus yang sesuai dengan kebutuhan Anda
            </p>
          </div>
        </div>

        {/* Bus Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {buses.length === 0 ? (
            <div className="col-span-full bg-white rounded-3xl shadow-xl p-12 text-center border-2 border-gray-200">
              <div className="text-8xl mb-6">🚌</div>
              <p className="text-xl text-gray-600 font-semibold mb-2">Tidak ada bus tersedia</p>
              <p className="text-gray-500">Silakan pilih rute atau tanggal lain</p>
            </div>
          ) : (
            buses.map((bus) => {
              const busConfig = BUS_TYPES[bus.tipe as keyof typeof BUS_TYPES] || BUS_TYPES['Business Class']
              const price = bus.seats[0]?.harga || busConfig.basePrice
              const borderColor = busConfig.color === 'orange' ? 'border-orange-300' : busConfig.color === 'blue' ? 'border-blue-300' : 'border-purple-300'
              const badgeColor = busConfig.color === 'orange' ? 'bg-orange-500' : busConfig.color === 'blue' ? 'bg-blue-500' : 'bg-purple-500'
              
              return (
                <div
                  key={bus.id}
                  className={`bg-white rounded-3xl shadow-lg overflow-hidden border-2 ${borderColor} hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative`}
                >
                  {/* Badge */}
                  <div className={`absolute top-4 right-4 ${badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10`}>
                    {busConfig.badge}
                  </div>

                  {/* Bus Image */}
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    {bus.imageUrl || busConfig.defaultImage ? (
                      <Image
                        src={bus.imageUrl || busConfig.defaultImage}
                        alt={bus.tipe}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-7xl">
                        {busConfig.icon}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-black drop-shadow-lg">
                        {bus.tipe}
                      </h3>
                    </div>
                  </div>

                  {/* Bus Details */}
                  <div className="p-6">
                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 h-16">
                      {busConfig.description}
                    </p>

                    {/* Facilities */}
                    <div className="mb-4">
                      <p className="text-xs font-bold text-gray-700 uppercase mb-2 flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Fasilitas
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {busConfig.facilities.map((facility, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full border border-gray-200"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Time and Price */}
                    <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-bold">{busConfig.time}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">Mulai dari</p>
                        <p className="text-2xl font-black text-orange-600">
                          {(price / 1000).toFixed(0)}K
                        </p>
                      </div>
                    </div>

                    {/* Select Button */}
                    <button
                      onClick={() => handleSelectBus(bus.id)}
                      className={`w-full ${badgeColor} text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all active:scale-95 transform shadow-lg`}
                    >
                      Pilih Bus Ini
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Info Section */}
        {buses.length > 0 && (
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white text-center shadow-xl mb-6">
            <h3 className="text-2xl font-bold mb-3">🎯 Tips Memilih Bus</h3>
            <p className="text-orange-100 max-w-3xl mx-auto">
              <span className="font-semibold">Business Class</span> cocok untuk perjalanan singkat, 
              <span className="font-semibold"> High Class</span> memberikan kenyamanan lebih untuk perjalanan menengah, dan 
              <span className="font-semibold"> Sleeper Class</span> sempurna untuk perjalanan jauh dengan istirahat maksimal.
            </p>
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="w-full max-w-md mx-auto block bg-white border-2 border-gray-300 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-50 transition-colors shadow-md"
        >
          ← Kembali ke Pencarian
        </button>
      </div>
    </main>
  )
}
