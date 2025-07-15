// middleware.js- This is a sample middleware file for the frontend that I created to protect the routes in a different application.
// I will be using this middleware file in the future to protect the routes in the application.

import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name, options) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Refresh session if expired
  const { data: { session }, error } = await supabase.auth.getSession()

  // Define protected routes (main app routes)
  const protectedRoutes = [
    '/dashboard',
    '/settings',
    '/briefings',
    '/profile'
  ]

  // Define auth routes (login/signup)
  const authRoutes = [
    '/login',
    '/signup'
  ]

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname === route || 
    request.nextUrl.pathname.startsWith(`${route}/`)
  )

  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some(route => 
    request.nextUrl.pathname === route || 
    request.nextUrl.pathname.startsWith(`${route}/`)
  )

  // Check if it's the root path
  const isRootPath = request.nextUrl.pathname === '/'

  // Redirect logic
  if (isProtectedRoute && !session) {
    // User trying to access protected route without being authenticated
    const redirectUrl = new URL('/login', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  if (isAuthRoute && session) {
    // User trying to access auth routes while already authenticated
    const redirectUrl = new URL('/dashboard', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  if (isRootPath && session) {
    // User authenticated and accessing root, redirect to dashboard
    const redirectUrl = new URL('/dashboard', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  if (isRootPath && !session) {
    // User not authenticated and accessing root, redirect to login
    const redirectUrl = new URL('/login', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
}