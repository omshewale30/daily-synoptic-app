'use client'

import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Brain, User, Settings, LogOut, Home } from 'lucide-react'

export function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <nav className="bg-gray-800/95 backdrop-blur-sm border-b border-gray-700 fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-white hover:text-teal-400 transition-colors">
            <Brain className="w-8 h-8" />
            <span className="text-xl font-bold">Daily Synoptic</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link href="/settings" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
                <div className="flex items-center gap-2 text-gray-300">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-red-400 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link href="/signup" className="btn-primary">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}