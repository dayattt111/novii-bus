import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('temanbus_session')
  const { pathname } = request.nextUrl

  // Protected routes
  const protectedRoutes = ['/dashboard', '/booking', '/profile']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Auth routes
  const authRoutes = ['/login', '/register']
  const isAuthRoute = authRoutes.includes(pathname)

  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to dashboard if accessing auth route with session
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
