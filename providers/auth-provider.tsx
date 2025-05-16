"use client"

import type React from "react"

import { createContext, useState, useEffect } from "react"
import type { User } from "@/types"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => void
  register: (name: string, email: string, password: string) => void
  logout: () => void
  updateBalance: (newBalance: number) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("paygo_user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    setIsLoading(false)
  }, [])

  const login = (email: string, password: string) => {
    // In a real app, this would make an API call
    // For demo purposes, we'll just set a user
    const newUser = {
      id: "1",
      name: "Drex",
      email,
      balance: 180000,
      hasPayId: true,
    }

    setUser(newUser)
    localStorage.setItem("paygo_user", JSON.stringify(newUser))
  }

  const register = (name: string, email: string, password: string) => {
    // In a real app, this would make an API call
    // For demo purposes, we'll just set a user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      balance: 180000,
      hasPayId: false,
    }

    setUser(newUser)
    localStorage.setItem("paygo_user", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("paygo_user")
  }

  const updateBalance = (newBalance: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        balance: newBalance,
      }
      setUser(updatedUser)
      localStorage.setItem("paygo_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateBalance }}>
      {children}
    </AuthContext.Provider>
  )
}
