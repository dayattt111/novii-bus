'use server'

import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { hashPassword, verifyPassword, createSession, destroySession } from '@/lib/auth'

export async function registerUser(formData: FormData) {
  const nama = formData.get('nama') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Validasi
  if (!nama || !email || !password) {
    return { error: 'Semua field harus diisi' }
  }

  // Cek email sudah terdaftar
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return { error: 'Email sudah terdaftar' }
  }

  // Hash password dan buat user
  const hashedPassword = await hashPassword(password)
  
  const user = await prisma.user.create({
    data: {
      nama,
      email,
      password: hashedPassword,
    },
  })

  // Buat session
  await createSession(user.id)

  redirect('/dashboard')
}

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Validasi
  if (!email || !password) {
    return { error: 'Email dan password harus diisi' }
  }

  // Cari user
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return { error: 'Email atau password salah' }
  }

  // Verify password
  const isValid = await verifyPassword(password, user.password)

  if (!isValid) {
    return { error: 'Email atau password salah' }
  }

  // Buat session
  await createSession(user.id)

  redirect('/dashboard')
}

export async function logoutUser() {
  await destroySession()
  redirect('/')
}
