"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { useNotification } from "@/hooks/use-notification"
import HeaderBack from "@/components/header-back"

const networks = ["Airtel", "MTN", "Glo", "9mobile"]
const amounts = [
  { value: 50, cashback: 1 },
  { value: 100, cashback: 2 },
  { value: 200, cashback: 3 },
  { value: 500, cashback: 10 },
  { value: 1000, cashback: 20 },
  { value: 2000, cashback: 50 },
  { value: 3000, cashback: 75 },
  { value: 5000, cashback: 125 },
  { value: 10000, cashback: 250 },
]

export default function AirtimePage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const { addNotification } = useNotification()
  const [selectedNetwork, setSelectedNetwork] = useState("MTN")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [payId, setPayId] = useState("")

  if (isLoading || !user) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  const handleBuyAirtime = () => {
    if (!phoneNumber) {
      alert("Please enter a phone number")
      return
    }

    if (!selectedAmount) {
      alert("Please select an amount")
      return
    }

    if (!payId) {
      alert("Please enter your PAY ID")
      return
    }

    // In a real app, this would make an API call
    addNotification({
      title: "Airtime Purchase",
      message: `You have successfully purchased ₦${selectedAmount} airtime for ${phoneNumber}.`,
    })

    // Add transaction to history
    const transaction = {
      id: Date.now().toString(),
      type: "airtime",
      amount: selectedAmount,
      status: "completed",
      timestamp: new Date().toISOString(),
      details: `Airtime purchase for ${phoneNumber}`,
    }

    const storedTransactions = localStorage.getItem("paygo_transactions")
    const transactions = storedTransactions ? JSON.parse(storedTransactions) : []
    localStorage.setItem("paygo_transactions", JSON.stringify([transaction, ...transactions]))

    router.push("/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <HeaderBack title="Airtime" />

      <div className="p-4">
        <div className="bg-purple-600 text-white rounded-xl p-4 mb-6 flex justify-between items-center">
          <div>
            <span className="font-medium">Enjoy </span>
            <span className="text-yellow-300 font-bold">Airtime Bonuses!</span>
          </div>
          <button className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-full">GO</button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {networks.map((network) => (
            <button
              key={network}
              className={`p-3 rounded-lg border ${
                selectedNetwork === network ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white"
              }`}
              onClick={() => setSelectedNetwork(network)}
            >
              {network}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <input
            type="tel"
            placeholder="Enter mobile number"
            className="input-field"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <h3 className="text-lg font-medium mb-4">Select Amount</h3>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {amounts.map((amount) => (
            <button
              key={amount.value}
              className={`p-3 rounded-lg border text-center ${
                selectedAmount === amount.value ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white"
              }`}
              onClick={() => setSelectedAmount(amount.value)}
            >
              <p className="text-lg font-bold">₦{amount.value}</p>
              <p className="text-sm text-gray-500">₦{amount.cashback} Cashback</p>
            </button>
          ))}
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter PAY ID Code"
            className="input-field"
            value={payId}
            onChange={(e) => setPayId(e.target.value)}
          />
        </div>

        <button onClick={handleBuyAirtime} className="btn-primary bg-purple-500">
          Buy Airtime
        </button>
      </div>
    </main>
  )
}
