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
    'Pare-Pare', 'Watampone', 'Bulukumba', 'Kolaka', 'Rantepao',
    'Sorowako', 'Morowali'
  ]

  // Generate rute populer (tidak semua kombinasi)
  const popularRoutes = []
  
  // Dari Makassar ke semua kota dengan estimasi durasi
  for (let i = 1; i < cities.length; i++) {
    const distance = i * 50 // km estimasi
    const duration = Math.ceil(distance / 60) // jam (kecepatan rata-rata 60km/jam)
    
    popularRoutes.push({
      kotaAsal: 'Makassar',
      kotaTujuan: cities[i],
      harga: 100000 + (i * 25000),
      durasi: `${duration} jam`
    })
    // Rute balik
    popularRoutes.push({
      kotaAsal: cities[i],
      kotaTujuan: 'Makassar',
      harga: 100000 + (i * 25000),
      durasi: `${duration} jam`
    })
  }

  // Tambah rute antar kota besar
  const majorCities = ['Manado', 'Palu', 'Kendari', 'Gorontalo', 'Palopo', 'Sorowako', 'Morowali', 'Mamuju']
  for (let i = 0; i < majorCities.length; i++) {
    for (let j = i + 1; j < majorCities.length; j++) {
      const distance = Math.abs(i - j)
      const harga = 150000 + (distance * 30000)
      const duration = Math.ceil((distance + 3) * 50 / 60)
      
      popularRoutes.push({
        kotaAsal: majorCities[i],
        kotaTujuan: majorCities[j],
        harga: harga,
        durasi: `${duration} jam`
      })
      popularRoutes.push({
        kotaAsal: majorCities[j],
        kotaTujuan: majorCities[i],
        harga: harga,
        durasi: `${duration} jam`
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
      seats: 32, // 32 kursi biasa (1-32)
      layout: 'single', // Single level
      priceMultiplier: 1.0,
      imageUrl: '/image/bus1.jpg'
    },
    { 
      tipe: 'High Class', 
      seats: 32, // 32 kursi premium (1-32)
      layout: 'single',
      priceMultiplier: 1.25,
      imageUrl: '/image/bus2.jpg'
    },
    { 
      tipe: 'Sleeper Class', 
      seats: 32, // 16 lower (A1-A16) + 16 upper (B1-B16)
      layout: 'double', // Double decker / bertingkat
      priceMultiplier: 1.75,
      imageUrl: '/image/bus3.jpg'
    },
  ]

  let busCount = 0
  let seatCount = 0

  console.log(`🚌 Creating buses and seats...`)

  // Untuk setiap route, buat SEMUA 3 tipe bus (Business, High, Sleeper)
  for (const route of allRoutes) {
    // Buat bus untuk SEMUA tipe (3 bus per route)
    for (const busType of busTypes) {
      const createdBus = await prisma.bus.create({
        data: {
          routeId: route.id,
          tipe: busType.tipe,
          nama: `${busType.tipe} ${route.kotaAsal}-${route.kotaTujuan}`,
          imageUrl: busType.imageUrl,
        },
      })

      busCount++

      // Harga per kursi sama untuk semua kursi di bus yang sama
      const baseSeatPrice = Math.round(route.harga * busType.priceMultiplier)

      // Buat Seats dengan layout berbeda untuk Sleeper vs reguler
      const seats = []

      if (busType.layout === 'double') {
        // Sleeper Class: Layout bertingkat A1-A16 (lower), B1-B16 (upper)
        for (let i = 1; i <= 16; i++) {
          // Lower deck (A)
          seats.push({
            busId: createdBus.id,
            nomorKursi: `A${i}`,
            harga: baseSeatPrice,
            isBooked: false,
          })
          // Upper deck (B)
          seats.push({
            busId: createdBus.id,
            nomorKursi: `B${i}`,
            harga: baseSeatPrice,
            isBooked: false,
          })
          seatCount += 2
        }
      } else {
        // Business & High Class: Layout biasa 1-32
        for (let seatNum = 1; seatNum <= 32; seatNum++) {
          seats.push({
            busId: createdBus.id,
            nomorKursi: String(seatNum),
            harga: baseSeatPrice,
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

    // Progress log setiap 30 buses
    if (busCount % 30 === 0) {
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
