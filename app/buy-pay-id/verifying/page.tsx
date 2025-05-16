"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Logo } from "@/components/logo"

export default function VerifyingPaymentPage() {
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

    // Redirect to failure page after 10 seconds
    const timer = setTimeout(() => {
      router.push("/buy-pay-id/failed")
    }, 10000)

    return () => clearTimeout(timer)
  }, [user, router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-white">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        <Logo className="w-full max-w-xs mb-8 animate-pulse" animated />

        <h1 className="text-2xl font-bold text-purple-900 mb-4">Verifying Payment</h1>

        <p className="text-lg text-gray-600 mb-8">
          Please wait while we verify your payment. This may take a few moments.
        </p>

        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-8"></div>

        <p className="text-sm text-gray-500">
          Do not close this page. You will be redirected automatically once verification is complete.
        </p>
      </div>
    </main>
  )
}
