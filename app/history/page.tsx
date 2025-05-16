"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import HeaderBack from "@/components/header-back"
import type { Transaction } from "@/types"
import { formatDistanceToNow } from "@/utils/date"

export default function HistoryPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    // Load transactions from localStorage
    const storedTransactions = localStorage.getItem("paygo_transactions")

    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions))
    } else {
      // Add only welcome bonus transaction
      const welcomeBonus: Transaction = {
        id: "welcome-bonus",
        type: "pay_id",
        amount: 180000,
        status: "completed",
        timestamp: new Date().toISOString(),
        details: "Welcome bonus credited to your account",
      }

      setTransactions([welcomeBonus])
      localStorage.setItem("paygo_transactions", JSON.stringify([welcomeBonus]))
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const getTransactionIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "withdrawal":
        return "💸"
      case "airtime":
        return "📱"
      case "data":
        return "📶"
      case "pay_id":
        return "🎁"
      case "bpc":
        return "💳"
      default:
        return "💰"
    }
  }

  const getTransactionTitle = (transaction: Transaction) => {
    switch (transaction.type) {
      case "withdrawal":
        return "Withdrawal"
      case "airtime":
        return "Airtime Purchase"
      case "data":
        return "Data Purchase"
      case "pay_id":
        return transaction.id === "welcome-bonus" ? "Welcome Bonus" : "PAY ID Purchase"
      case "bpc":
        return "BPC Purchase"
      default:
        return "Transaction"
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <HeaderBack title="Transaction History" />

      <div className="p-4">
        {transactions.length === 0 ? (
          <div className="bg-white rounded-xl p-6 text-center">
            <p className="text-gray-500">No transactions yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="bg-white rounded-xl p-4 flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-xl mr-3">
                  {getTransactionIcon(transaction.type)}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{getTransactionTitle(transaction)}</h3>
                      <p className="text-sm text-gray-500">{transaction.details}</p>
                    </div>

                    <div className="text-right">
                      <p
                        className={`font-medium ${transaction.type === "withdrawal" ? "text-red-500" : "text-green-500"}`}
                      >
                        {transaction.type === "withdrawal" ? "-" : "+"}₦{transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">{formatDistanceToNow(new Date(transaction.timestamp))}</p>
                    </div>
                  </div>

                  <div className="mt-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : transaction.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
