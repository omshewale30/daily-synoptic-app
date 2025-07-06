'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { loginUser, signupUser } from '../lib/api'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored token on initial load
    const storedToken = localStorage.getItem('daily_synoptic_token')
    const storedUser = localStorage.getItem('daily_synoptic_user')
    
    if (storedToken && storedUser) {
      try {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        localStorage.removeItem('daily_synoptic_token')
        localStorage.removeItem('daily_synoptic_user')
      }
    }
    
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password)
      
      const { access_token, user: userData } = response
      
      setToken(access_token)
      setUser(userData)
      
      // Store in localStorage
      localStorage.setItem('daily_synoptic_token', access_token)
      localStorage.setItem('daily_synoptic_user', JSON.stringify(userData))
      
      return response
    } catch (error) {
      throw error
    }
  }

  const signup = async (email, password, fullName) => {
    try {
      // First create the user
      const signupResponse = await signupUser({ email, password, full_name: fullName })
      
      // Then log them in
      const loginResponse = await loginUser(email, password)
      
      const { access_token, user: userData } = loginResponse
      
      setToken(access_token)
      setUser(userData)
      
      // Store in localStorage
      localStorage.setItem('daily_synoptic_token', access_token)
      localStorage.setItem('daily_synoptic_user', JSON.stringify(userData))
      
      return loginResponse
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('daily_synoptic_token')
    localStorage.removeItem('daily_synoptic_user')
  }

  const value = {
    user,
    token,
    isLoading,
    login,
    signup,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}