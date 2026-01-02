import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
  adapter,
})

async function main() {
  console.log('🌱 Seeding database...')

  // Kota-kota utama di Sulawesi
  const cities = [
    'Makassar', 'Manado', 'Palu', 'Kendari', 'Gorontalo',
    'Palopo', 'Toraja', 'Mamuju', 'Bau-Bau', 'Bitung',
    'Pare-Pare', 'Watampone', 'Bulukumba', 'Kolaka', 'Rantepao'
  ]

  // Generate rute populer (tidak semua kombinasi)
  const popularRoutes = []
  
  // Dari Makassar ke semua kota
  for (let i = 1; i < cities.length; i++) {
    popularRoutes.push({
      kotaAsal: 'Makassar',
      kotaTujuan: cities[i],
      harga: 100000 + (i * 25000)
    })
    // Rute balik
    popularRoutes.push({
      kotaAsal: cities[i],
      kotaTujuan: 'Makassar',
      harga: 100000 + (i * 25000)
    })
  }

  // Tambah rute antar kota besar
  const majorCities = ['Manado', 'Palu', 'Kendari', 'Gorontalo', 'Palopo']
  for (let i = 0; i < majorCities.length; i++) {
    for (let j = i + 1; j < majorCities.length; j++) {
      const distance = Math.abs(i - j)
      const harga = 150000 + (distance * 30000)
      
      popularRoutes.push({
        kotaAsal: majorCities[i],
        kotaTujuan: majorCities[j],
        harga: harga
      })
      popularRoutes.push({
        kotaAsal: majorCities[j],
        kotaTujuan: majorCities[i],
        harga: harga
      })
    }
  }

  console.log(`📍 Creating ${popularRoutes.length} routes...`)

  // Hapus data lama dalam urutan yang benar (foreign key constraint)
  console.log('   Deleting old data...')
  await prisma.booking.deleteMany({})
  await prisma.seat.deleteMany({})
  await prisma.bus.deleteMany({})
  await prisma.route.deleteMany({})
  console.log('   Old data deleted')
  
  await prisma.route.createMany({
    data: popularRoutes,
    skipDuplicates: true,
  })

  console.log('✅ Routes created')

  // Ambil semua routes
  const allRoutes = await prisma.route.findMany()
  
  // Tipe bus dengan konfigurasi
  const busTypes = [
    { 
      tipe: 'Business Class', 
      seats: { rows: 9, columns: 4 }, 
      priceMultiplier: 1.0,
      imageUrl: '/image/bus.jpeg' // Default image
    },
    { 
      tipe: 'High Class', 
      seats: { rows: 8, columns: 4 }, 
      priceMultiplier: 1.5,
      imageUrl: '/image/bus.jpeg'
    },
    { 
      tipe: 'Sleeper Class', 
      seats: { rows: 6, columns: 4 }, 
      priceMultiplier: 2.0,
      imageUrl: '/image/bus.jpeg'
    },
  ]

  let busCount = 0
  let seatCount = 0

  console.log(`🚌 Creating buses and seats...`)

  // Untuk setiap route, buat 1-2 bus
  for (const route of allRoutes) {
    // Pilih 1-2 tipe bus
    const numBuses = Math.random() > 0.5 ? 2 : 1
    const selectedTypes = busTypes.slice(0, numBuses)

    for (let i = 0; i < selectedTypes.length; i++) {
      const busType = selectedTypes[i]
      
      const createdBus = await prisma.bus.create({
        data: {
          routeId: route.id,
          tipe: busType.tipe,
          nama: `${busType.tipe} ${route.kotaAsal}-${route.kotaTujuan}`,
          imageUrl: busType.imageUrl, // Set default image
        },
      })

      busCount++

      // Buat Seats
      const seats = []
      const seatLetters = ['A', 'B', 'C', 'D'].slice(0, busType.seats.columns)
      const seatPrice = Math.round(route.harga * busType.priceMultiplier / (busType.seats.rows * busType.seats.columns))

      for (const letter of seatLetters) {
        for (let row = 1; row <= busType.seats.rows; row++) {
          seats.push({
            busId: createdBus.id,
            nomorKursi: `${letter}${row}`,
            harga: seatPrice,
            isBooked: false,
          })
          seatCount++
        }
      }

      // Bulk insert seats
      await prisma.seat.createMany({
        data: seats,
      })
    }

    // Progress log setiap 10 routes
    if (busCount % 20 === 0) {
      console.log(`   Progress: ${busCount} buses created...`)
    }
  }

  console.log(`✅ Created ${busCount} buses with ${seatCount} seats total`)
  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
