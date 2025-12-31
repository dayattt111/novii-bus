import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Buat Routes
  const routes = [
    { kotaAsal: 'Makassar', kotaTujuan: 'Toraja', harga: 250000 },
    { kotaAsal: 'Makassar', kotaTujuan: 'Palopo', harga: 200000 },
    { kotaAsal: 'Makassar', kotaTujuan: 'Sorowako', harga: 300000 },
    { kotaAsal: 'Makassar', kotaTujuan: 'Morowali', harga: 350000 },
    { kotaAsal: 'Makassar', kotaTujuan: 'Mamuju', harga: 220000 },
    { kotaAsal: 'Toraja', kotaTujuan: 'Makassar', harga: 250000 },
    { kotaAsal: 'Palopo', kotaTujuan: 'Makassar', harga: 200000 },
  ]

  for (const route of routes) {
    await prisma.route.upsert({
      where: {
        kotaAsal_kotaTujuan: {
          kotaAsal: route.kotaAsal,
          kotaTujuan: route.kotaTujuan,
        },
      },
      update: {},
      create: route,
    })
  }

  console.log('✅ Routes created')

  // Ambil route pertama untuk contoh
  const route1 = await prisma.route.findFirst({
    where: { kotaAsal: 'Makassar', kotaTujuan: 'Toraja' },
  })

  if (route1) {
    // Buat Buses
    const buses = [
      { routeId: route1.id, tipe: 'Ekonomi', nama: 'Bus Ekonomi 1', imageUrl: null },
      { routeId: route1.id, tipe: 'Eksekutif', nama: 'Bus Eksekutif 1', imageUrl: null },
      { routeId: route1.id, tipe: 'Sleeper', nama: 'Bus Sleeper 1', imageUrl: null },
    ]

    for (const bus of buses) {
      const createdBus = await prisma.bus.create({
        data: bus,
      })

      // Buat Seats untuk setiap bus
      const seatLetters = ['A', 'B', 'C']
      const seatNumbers = [1, 2, 3, 4]
      
      let seatPrice = 150000
      if (bus.tipe === 'Eksekutif') seatPrice = 200000
      if (bus.tipe === 'Sleeper') seatPrice = 250000

      for (const letter of seatLetters) {
        for (const number of seatNumbers) {
          await prisma.seat.create({
            data: {
              busId: createdBus.id,
              nomorKursi: `${letter}${number}`,
              harga: seatPrice,
              isBooked: false,
            },
          })
        }
      }
    }

    console.log('✅ Buses and Seats created')
  }

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
