"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Logo } from "@/components/logo"

export default function WatchPage() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    // Redirect to Telegram group after a short delay
    const timer = setTimeout(() => {
      window.location.href = "https://t.me/+0uSrNzTtEcllNGJk"
    }, 2000)

    return () => clearTimeout(timer)
  }, [user, router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#f8f0f2]">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        <Logo className="w-full max-w-xs mb-8 animate-pulse" animated />

        <h1 className="text-2xl font-bold text-purple-900 mb-4">Redirecting to Telegram</h1>

        <p className="text-lg text-gray-600 mb-8">
          You&apos;re being redirected to our Telegram group where you can watch educational videos on how to earn with
          PayGo.
        </p>

        <div className="flex space-x-2 justify-center">
          <div className="h-3 w-3 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-3 w-3 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-3 w-3 bg-purple-600 rounded-full animate-bounce"></div>
        </div>

        <a
          href="https://t.me/+0uSrNzTtEcllNGJk"
          className="mt-8 bg-purple-600 text-white font-medium py-2 px-6 rounded-full hover:bg-purple-700 transition-colors"
        >
          Open Telegram Now
        </a>
      </div>
    </main>
  )
}
