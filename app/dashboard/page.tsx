"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { useNotification } from "@/hooks/use-notification"
import Header from "@/components/header"
import DashboardMenu from "@/components/dashboard-menu"

export default function Dashboard() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const { notifications } = useNotification()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <Header user={user} notificationCount={notifications.filter((n) => !n.read).length} />

      <div className="p-3">
        <div className="balance-card mb-4 p-3">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-base font-medium">Today Balance</h2>
              <p className="text-2xl font-bold">₦{user.balance.toLocaleString()}</p>
              <p className="text-xs">Weekly Rewards: ₦ 200,000</p>
            </div>
            <button
              onClick={() => router.push("/withdraw")}
              className="bg-white text-purple-600 font-medium py-1.5 px-4 rounded-full hover:bg-gray-100 transition-colors"
            >
              Withdraw
            </button>
          </div>
        </div>

        <DashboardMenu />
      </div>
    </main>
  )
}
