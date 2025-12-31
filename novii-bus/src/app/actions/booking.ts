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

  const seatId = formData.get('seatId') as string
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

  // Validasi tanggal
  if (!tanggalKeberangkatanStr || tanggalKeberangkatanStr.trim() === '') {
    return { error: 'Tanggal keberangkatan harus diisi' }
  }

  // Parse tanggal dengan format YYYY-MM-DD dari input type="date"
  // Pastikan parse menggunakan UTC untuk menghindari timezone issues
  const [year, month, day] = tanggalKeberangkatanStr.split('-').map(Number)
  
  if (!year || !month || !day || month < 1 || month > 12 || day < 1 || day > 31) {
    return { error: `Format tanggal tidak valid. Gunakan format YYYY-MM-DD. Diterima: ${tanggalKeberangkatanStr}` }
  }

  // Buat Date object dengan UTC untuk menghindari timezone shift
  const tanggalKeberangkatan = new Date(Date.UTC(year, month - 1, day, 0, 0, 0))
  
  if (isNaN(tanggalKeberangkatan.getTime())) {
    return { error: `Tidak dapat membuat tanggal dari: ${tanggalKeberangkatanStr}` }
  }

  // Cek seat masih available
  const seat = await prisma.seat.findUnique({
    where: { id: seatId },
  })

  if (!seat || seat.isBooked) {
    return { error: 'Kursi sudah dibooking' }
  }

  // Generate QR Code
  const bookingData = {
    namaPenumpang,
    noHp,
    tanggal: tanggalKeberangkatanStr,
    waktu: waktuKeberangkatan,
  }
  const qrCode = await QRCode.toDataURL(JSON.stringify(bookingData))

  // Buat booking
  const booking = await prisma.booking.create({
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
      totalHarga,
      biayaLayanan,
      metodePembayaran,
      qrCode,
    },
  })

  // Update seat status
  await prisma.seat.update({
    where: { id: seatId },
    data: { isBooked: true },
  })

  redirect(`/booking/${booking.id}/payment`)
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
