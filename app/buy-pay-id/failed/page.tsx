"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Eye, EyeOff } from "lucide-react"

export default function PaymentFailedPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("•••••••••••")

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    // Check if form data exists
    const formData = localStorage.getItem("paygo_pay_id_form")
    if (!formData) {
      router.push("/buy-pay-id")
      return
    }
  }, [user, router])

  const handleRetry = () => {
    router.push("/buy-pay-id")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-white">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-orange-400 mb-4">Transaction verification failed!</h1>

        <p className="text-gray-700 mb-8">
          Your payment could not be completed. Reason: Unable to validate account / invalid mobile money account.
        </p>

        <div className="w-full relative mb-8">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-3 border border-gray-300 rounded-md pr-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            readOnly
          />
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
          </button>
        </div>

        <button
          onClick={handleRetry}
          className="w-full bg-purple-600 text-white font-medium py-3 px-4 rounded-md hover:bg-purple-700 transition-colors mb-4"
        >
          Try Again
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="w-full bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-md hover:bg-gray-300 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </main>
  )
}
