"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Logo } from "@/components/logo"
import Link from "next/link"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { register } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !email || !password) {
      setError("Please fill in all fields")
      return
    }

    try {
      register(name, email, password)
      router.push("/welcome")
    } catch (err) {
      setError("Registration failed. Please try again.")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-[#f8f0f2]">
      <div className="absolute top-4 right-4">
        <Link href="/help" className="text-purple-600 font-medium">
          Need Help?
        </Link>
      </div>

      <div className="w-full max-w-md flex flex-col items-center justify-center flex-1">
        <Logo className="w-full max-w-xs mb-8" animated />

        <h1 className="text-2xl font-medium text-gray-700 mb-8">Register to continue</h1>

        {error && <div className="w-full mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter Name"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Enter Email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Enter Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary">
            Register
          </button>
        </form>

        <p className="mt-6">
          <Link href="/login" className="text-purple-600 font-medium">
            Already have an account? Login
          </Link>
        </p>
      </div>
    </main>
  )
}
