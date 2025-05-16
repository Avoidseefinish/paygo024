"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Logo } from "@/components/logo"

export default function Welcome() {
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#f8f0f2]">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        <Logo className="w-full max-w-xs mb-8" animated />

        <h1 className="text-3xl font-bold text-purple-900 mb-6">Welcome to PayGo!</h1>

        <p className="text-lg text-gray-600 mb-8">
          As a new user, you&apos;ll receive a generous welcome bonus of ₦180,000, which can be withdrawn at any time.
          Yes, you read that right - it&apos;s yours to keep!
        </p>

        <button onClick={() => router.push("/dashboard")} className="btn-primary">
          Continue to Dashboard
        </button>
      </div>
    </main>
  )
}
