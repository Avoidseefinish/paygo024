"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { CheckCircle } from "lucide-react"

export default function PayIdSuccessPage() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    // Automatically redirect to dashboard after 5 seconds
    const timer = setTimeout(() => {
      router.push("/dashboard")
    }, 5000)

    return () => clearTimeout(timer)
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />

        <h1 className="text-2xl font-bold mb-4">PAY ID Activated!</h1>

        <p className="mb-6">
          Your PAY ID has been successfully activated. You can now withdraw funds from your PayGo account.
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Your PAY ID:{" "}
          <span className="font-medium">
            PAY-{user.id}-{Math.floor(Math.random() * 1000)}
          </span>
        </p>

        <button onClick={() => router.push("/dashboard")} className="btn-primary">
          Return to Dashboard
        </button>
      </div>
    </main>
  )
}
