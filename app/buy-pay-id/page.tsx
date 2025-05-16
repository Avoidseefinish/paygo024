"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

export default function BuyPayIdPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  if (!user) {
    router.push("/login")
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!fullName || !email) {
      setError("Please fill in all fields")
      return
    }

    // Store the form data in localStorage to use in the next steps
    localStorage.setItem(
      "paygo_pay_id_form",
      JSON.stringify({
        fullName,
        email,
        amount: 6500,
        timestamp: new Date().toISOString(),
      }),
    )

    // Redirect to loading page
    router.push("/buy-pay-id/loading")
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="bg-purple-900 p-4">
        <h1 className="text-white text-xl font-medium">Buy PAY ID</h1>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-gray-600 mb-2">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              value="₦6,500"
              disabled
              className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="fullName" className="block text-gray-600 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Your full name"
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Your Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="email address"
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && <div className="p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-medium py-3 px-4 rounded-md hover:bg-purple-700 transition-colors"
          >
            Pay
          </button>

          <p className="text-center text-gray-600 text-sm mt-4">
            Your PAY ID will be displayed on the app once your payment is confirmed.
          </p>
        </form>

        <div className="mt-auto pt-8 text-center text-gray-700 text-sm">PayGo Financial Services LTD</div>
      </div>
    </main>
  )
}
