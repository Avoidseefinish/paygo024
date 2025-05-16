"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"

export default function WithdrawSuccessPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [withdrawalData, setWithdrawalData] = useState<any>(null)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    // Get withdrawal data from localStorage
    const storedData = localStorage.getItem("paygo_withdrawal")
    if (!storedData) {
      router.push("/withdraw")
      return
    }

    setWithdrawalData(JSON.parse(storedData))

    // Clear withdrawal data after 5 seconds
    const timer = setTimeout(() => {
      localStorage.removeItem("paygo_withdrawal")
    }, 5000)

    return () => clearTimeout(timer)
  }, [user, router])

  if (!withdrawalData) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-white">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="absolute -right-2 -top-2 bg-purple-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-purple-600 mb-4">Transfer Successful!</h1>

        <p className="text-lg text-gray-800 mb-6">
          Your transfer of ₦{withdrawalData.amount.toLocaleString()} has been processed successfully.
        </p>

        <div className="bg-purple-100 px-6 py-2 rounded-full mb-8">
          <span className="text-purple-600 font-medium">🎉 Success</span>
        </div>

        <Link
          href="/dashboard"
          className="w-full bg-purple-600 text-white font-medium py-4 px-4 rounded-xl hover:bg-purple-700 transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    </main>
  )
}
