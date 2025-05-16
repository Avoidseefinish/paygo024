"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Logo } from "@/components/logo"

export default function PayIdLoadingPage() {
  const router = useRouter()
  const { user } = useAuth()

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

    // Redirect to payment page after 8 seconds
    const timer = setTimeout(() => {
      router.push("/buy-pay-id/payment")
    }, 8000)

    return () => clearTimeout(timer)
  }, [user, router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-white">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        <Logo className="w-full max-w-xs mb-8 animate-pulse" animated />

        <h1 className="text-2xl font-bold text-purple-900 mb-4">Preparing Bank Details</h1>

        <p className="text-lg text-gray-600 mb-8">
          Please wait while we prepare your payment details. This will only take a moment.
        </p>

        <div className="flex space-x-2 justify-center">
          <div className="h-3 w-3 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-3 w-3 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-3 w-3 bg-purple-600 rounded-full animate-bounce"></div>
        </div>
      </div>
    </main>
  )
}
