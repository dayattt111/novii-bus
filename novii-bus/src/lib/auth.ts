import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { cache } from 'react'
import { prisma } from './prisma'

const SESSION_COOKIE_NAME = 'temanbus_session'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createSession(userId: string) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
}

// Cache getSession untuk menghindari duplikasi query dalam satu request
export const getSession = cache(async () => {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)
  
  if (!sessionCookie) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { id: sessionCookie.value },
    select: {
      id: true,
      nama: true,
      email: true,
    },
  })

  return user
})

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
