'use server'

import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import QRCode from 'qrcode'

export async function createBooking(formData: FormData) {
  const user = await getSession()
  
  if (!user) {
    redirect('/login')
  }

  const seatIdsStr = formData.get('seatIds') as string
  const seatIds = seatIdsStr ? seatIdsStr.split(',') : []
  const busId = formData.get('busId') as string
  const namaPenumpang = formData.get('namaPenumpang') as string
  const noHp = formData.get('noHp') as string
  const naikDi = formData.get('naikDi') as string
  const turunDi = formData.get('turunDi') as string
  const tanggalKeberangkatanStr = formData.get('tanggalKeberangkatan') as string
  const waktuKeberangkatan = formData.get('waktuKeberangkatan') as string
  const totalHarga = parseInt(formData.get('totalHarga') as string)
  const biayaLayanan = parseInt(formData.get('biayaLayanan') as string)
  const metodePembayaran = formData.get('metodePembayaran') as string

  // Validasi
  if (!seatIds || seatIds.length === 0) {
    return { error: 'Tidak ada kursi yang dipilih' }
  }

  // Validasi tanggal
  if (!tanggalKeberangkatanStr || tanggalKeberangkatanStr.trim() === '') {
    return { error: 'Tanggal keberangkatan harus diisi' }
  }

  // Parse tanggal - terima format DD-MM-YYYY atau YYYY-MM-DD
  let year: number, month: number, day: number
  
  if (tanggalKeberangkatanStr.includes('-')) {
    const parts = tanggalKeberangkatanStr.split('-')
    
    // Cek apakah format DD-MM-YYYY atau YYYY-MM-DD
    if (parts[0].length === 4) {
      // Format YYYY-MM-DD
      [year, month, day] = parts.map(Number)
    } else {
      // Format DD-MM-YYYY
      [day, month, year] = parts.map(Number)
    }
  } else if (tanggalKeberangkatanStr.includes('/')) {
    // Format DD/MM/YYYY
    const parts = tanggalKeberangkatanStr.split('/')
    ;[day, month, year] = parts.map(Number)
  } else {
    return { error: `Format tanggal tidak valid. Gunakan format DD-MM-YYYY. Diterima: ${tanggalKeberangkatanStr}` }
  }
  
  if (!year || !month || !day || month < 1 || month > 12 || day < 1 || day > 31) {
    return { error: `Tanggal tidak valid: ${tanggalKeberangkatanStr}. Gunakan format DD-MM-YYYY` }
  }

  // Buat Date object dengan UTC untuk menghindari timezone shift
  const tanggalKeberangkatan = new Date(Date.UTC(year, month - 1, day, 0, 0, 0))
  
  if (isNaN(tanggalKeberangkatan.getTime())) {
    return { error: `Tidak dapat membuat tanggal dari: ${tanggalKeberangkatanStr}` }
  }

  // Cek semua seats masih available
  const seats = await prisma.seat.findMany({
    where: { id: { in: seatIds } },
  })

  if (seats.length !== seatIds.length) {
    return { error: 'Beberapa kursi tidak ditemukan' }
  }

  const bookedSeats = seats.filter(s => s.isBooked)
  if (bookedSeats.length > 0) {
    return { error: `Kursi ${bookedSeats.map(s => s.nomorKursi).join(', ')} sudah dibooking` }
  }

  // Generate QR Code
  const bookingData = {
    namaPenumpang,
    noHp,
    tanggal: tanggalKeberangkatanStr,
    waktu: waktuKeberangkatan,
    kursi: seats.map(s => s.nomorKursi).join(', '),
  }
  const qrCode = await QRCode.toDataURL(JSON.stringify(bookingData))

  // Buat multiple bookings (satu per kursi)
  const bookings = await Promise.all(
    seatIds.map(async (seatId) => {
      const seat = seats.find(s => s.id === seatId)!
      return prisma.booking.create({
        data: {
          userId: user.id,
          busId,
          seatId,
          namaPenumpang,
          noHp,
          naikDi,
          turunDi,
          tanggalKeberangkatan,
          waktuKeberangkatan,
          totalHarga: seat.harga + biayaLayanan,
          biayaLayanan,
          metodePembayaran,
          qrCode,
        },
      })
    })
  )

  // Update semua seat status
  await prisma.seat.updateMany({
    where: { id: { in: seatIds } },
    data: { isBooked: true },
  })

  // Redirect ke payment dengan booking pertama
  redirect(`/booking/${bookings[0].id}/payment`)
}

export async function updatePaymentStatus(bookingId: string) {
  await prisma.booking.update({
    where: { id: bookingId },
    data: { statusPembayaran: 'paid' },
  })

  redirect(`/booking/${bookingId}/ticket`)
}

export async function getBooking(bookingId: string) {
  return await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      bus: {
        include: {
          route: true,
        },
      },
      seat: true,
      user: true,
    },
  })
}

export async function getRoutes(kotaAsal?: string, kotaTujuan?: string) {
  const where: any = {}
  
  if (kotaAsal) where.kotaAsal = kotaAsal
  if (kotaTujuan) where.kotaTujuan = kotaTujuan

  return await prisma.route.findMany({
    where,
    include: {
      buses: true,
    },
  })
}

export async function getRoutesBySearch(from: string, to: string) {
  return await prisma.route.findMany({
    where: {
      kotaAsal: from,
      kotaTujuan: to,
    },
    include: {
      buses: true,
    },
  })
}

export async function getBusesByRoute(routeId: string) {
  return await prisma.bus.findMany({
    where: { routeId },
    include: {
      route: true,
      seats: true,
    },
  })
}

export async function getSeatsByBus(busId: string) {
  return await prisma.seat.findMany({
    where: { busId },
    orderBy: { nomorKursi: 'asc' },
  })
}

export async function getPopularRoutes() {
  // Ambil rute populer dengan jumlah bus terbanyak
  const routes = await prisma.route.findMany({
    include: {
      buses: {
        include: {
          seats: {
            where: { isBooked: false },
          },
        },
      },
    },
    take: 6,
    orderBy: {
      buses: {
        _count: 'desc',
      },
    },
  })

  // Format data untuk tampilan
  return routes.map((route) => {
    const availableBuses = route.buses.filter((bus) => bus.seats.length > 0)
    const minPrice = availableBuses.length > 0
      ? Math.min(...availableBuses.flatMap((bus) => bus.seats.map(seat => seat.harga)))
      : 0

    return {
      id: route.id,
      kotaAsal: route.kotaAsal,
      kotaTujuan: route.kotaTujuan,
      jumlahBus: route.buses.length,
      minPrice,
      availableBuses: availableBuses.length,
    }
  })
}

export async function getAllCities() {
  // Ambil semua kota yang ada di database (dari kotaAsal dan kotaTujuan)
  const routes = await prisma.route.findMany({
    select: {
      kotaAsal: true,
      kotaTujuan: true,
    },
  })

  const cities = new Set<string>()
  routes.forEach((route) => {
    cities.add(route.kotaAsal)
    cities.add(route.kotaTujuan)
  })

  return Array.from(cities).sort()
}
