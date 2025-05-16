"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Logo } from "@/components/logo"

export default function Home() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }, [user, router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#f8f0f2]">
      <div className="w-full max-w-md flex flex-col items-center">
        <Logo className="w-full max-w-xs mb-8" animated />
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4 text-purple-900">Welcome to PayGo!</h1>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    </main>
  )
}
